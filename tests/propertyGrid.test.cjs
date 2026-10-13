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
function load(file, query) {
  const exports = {};
  const requireLocal = id => {
    if (id === './useProperties' || id.endsWith('/useProperties')) return { useProperties: () => query };
    if (!id.startsWith('.')) return require(id);
    const base = path.resolve(path.dirname(file), id);
    return load([base, base+'.tsx', base+'.ts'].find(p=>fs.existsSync(p)), query);
  };
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}}).outputText,{exports,require:requireLocal,URLSearchParams});
  return exports;
}
test('controlled loading, failure/retry and empty results states', () => {
  for (const [query,text] of [
    [{isLoading:true},'Loading properties…'],
    [{isError:true,refetch:()=>Promise.resolve()},'Retry loading'],
    [{data:[],isLoading:false,isError:false},'No properties match these filters.'],
  ]) {
    const Grid=load(path.join(root,'src/features/properties/PropertyGrid.tsx'),query).PropertyGrid;
    const html=renderToStaticMarkup(React.createElement(MemoryRouter,null,React.createElement(Grid)));
    assert(html.includes(text));assert(!html.includes('aria-haspopup="dialog"'));
  }
});

test('homepage collection uses query loading, error, empty and database-only rows', () => {
 const inventory=load(path.join(root,'src/features/properties/dummyData.ts')).DUMMY_PROPERTIES;
 for(const [query,text] of [
  [{isLoading:true},'Loading properties…'],
  [{isError:true,error:new Error('Property listings are not configured.'),refetch:()=>Promise.resolve()},'Property listings are not configured.'],
  [{data:[],isLoading:false,isError:false},'No properties are currently published.'],
  [{data:[{...inventory[0],title:'Database-only residence'}]},'Database-only residence'],
 ]) {
  const Collection=load(path.join(root,'src/components/landing/SelectedResidences.tsx'),query).SelectedResidences;
  const html=renderToStaticMarkup(React.createElement(MemoryRouter,null,React.createElement(Collection)));
  assert(html.includes(text));assert(!html.includes('Villa d'));
 }
});
