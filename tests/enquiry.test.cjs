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
    if (id.endsWith('/useStore')) return { useUIStore: selector => selector({user:null,authStatus:'anonymous'}) };
    if (id === './enquiryApi') return { submitPropertyEnquiry: async () => { throw new Error('Unexpected write'); } };
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
const {createEnquirySchema}=load(path.join(root,'src/features/enquiries/enquirySchema.ts'));
const schema=createEnquirySchema(inventory);
const valid={propertyId:'prop-001',fullName:' Demo Tester ',email:' qa@example.com ',message:' Fictional request for property details. '};
test('enquiry trims and validates known property context',()=>{
 const parsed=schema.parse(valid);assert.equal(parsed.fullName,'Demo Tester');assert.equal(parsed.email,'qa@example.com');assert.equal(parsed.message,'Fictional request for property details.');
 for(const p of inventory)assert(schema.safeParse({...valid,propertyId:p.id}).success);
});
test('invalid context, blank, malformed and oversized fields rejected',()=>{
 for(const patch of [{propertyId:'prop-999'},{propertyId:'../prop-001'},{fullName:' '},{fullName:'123'},{fullName:'a'.repeat(101)},{email:'bad'},{email:'x'.repeat(255)},{message:' '},{message:'short'},{message:'!'.repeat(20)},{message:'a'.repeat(2001)}])assert(!schema.safeParse({...valid,...patch}).success);
 assert(!createEnquirySchema([]).safeParse(valid).success);
});
test('inline form labelled, explicitly preview-only and no dialog',()=>{
 const Form=load(path.join(root,'src/features/enquiries/PropertyEnquiryForm.tsx')).PropertyEnquiryForm;
 const {QueryClient,QueryClientProvider}=require('@tanstack/react-query');
 const html=renderToStaticMarkup(React.createElement(QueryClientProvider,{client:new QueryClient()},React.createElement(MemoryRouter,null,React.createElement(Form,{property:inventory[0],inventory}))));
 assert(html.includes('Preview enquiry'));assert(html.includes('nothing has been sent or saved'));assert(!html.includes('<dialog'));
 for(const match of html.matchAll(/<label[^>]*for="([^"]+)"/g))assert(html.includes('id="'+match[1]+'"'));
});
