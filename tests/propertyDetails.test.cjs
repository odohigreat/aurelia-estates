const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { MemoryRouter } = require('react-router-dom');
const root = path.join(__dirname, '..');
function load(file, query, propertyId) {
  const exports = {};
  const requireLocal = id => {
    if (id.endsWith('/enquiries/PropertyEnquiryForm')) return { PropertyEnquiryForm: () => require('react').createElement('section', null, 'Preview enquiry — nothing has been sent or saved') };
    if (id.endsWith('/useProperties') || id === './useProperties') return { useProperties: () => query };
    if (id==='react-router-dom') return {...require(id),useParams:()=>({propertyId})};
    if (!id.startsWith('.')) return require(id);
    const base = path.resolve(path.dirname(file), id);
    return load([base, base+'.tsx', base+'.ts'].find(p=>fs.existsSync(p)), query, propertyId);
  };
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}}).outputText,{exports,require:requireLocal,URLSearchParams});
  return exports;
}

const inventory=load(path.join(root,'src/features/properties/dummyData.ts')).DUMMY_PROPERTIES;
const {findProperty}=load(path.join(root,'src/features/properties/propertyLookup.ts'));
test('lookup valid, missing, malformed IDs and preservation',()=>{
 const before=JSON.stringify(inventory);
 for(const p of inventory)assert.equal(findProperty(inventory,p.id),p);
 for(const id of [undefined,'','prop-999','PROP-001','../prop-001','prop-001?x'])assert.equal(findProperty(inventory,id),undefined);
 assert.equal(findProperty(undefined,'prop-001'),undefined);assert.equal(findProperty([],'prop-001'),undefined);
 assert.equal(JSON.stringify(inventory),before);
});
test('detail page public rendering and states',()=>{
 for(const [query,id,text] of [[{data:inventory},'prop-001','The Sky Penthouse'],[{data:inventory},'prop-002',"Villa d&#x27;Este Estate"],[{data:inventory},'prop-004','CHF'],[{data:inventory},'prop-999','Property not found'],[{isLoading:true},'prop-001','Loading property'],[{isError:true},'prop-001','Retry loading']]){
 const Page=load(path.join(root,'src/pages/public/PropertyDetailsPage.tsx'),query,id).default;
 const html=renderToStaticMarkup(React.createElement(MemoryRouter,null,React.createElement(Page)));
 assert(html.includes(text));assert(!html.includes('<dialog'));assert(html.includes('Return to portfolio overview'));
 }
});
test('shared chart formulas preserved',()=>{
 const {generateMockCashFlow}=load(path.join(root,'src/features/properties/propertyCashFlow.ts'));
 for(const p of inventory){const rows=generateMockCashFlow(p.price);assert.equal(rows.length,5);rows.forEach((r,i)=>{assert.equal(r.revenue,Math.floor(p.price*(0.04+i*0.005)));assert.equal(r.opex,Math.floor(p.price*0.015));assert.equal(r.year,new Date().getFullYear()+i)});}
});
