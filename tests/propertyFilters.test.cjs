// Dependency-free runner: node --test tests/propertyFilters.test.cjs
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
function load(file) {
  const exports = {};
  const source = ts.transpileModule(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  vm.runInNewContext(source, { exports, URLSearchParams });
  return exports;
}
const { DUMMY_PROPERTIES: inventory } = load('src/features/properties/dummyData.ts');
const { DEFAULT_FILTERS: defaults, filterProperties: filter, parsePropertyFilters: parse, serializePropertyFilters: serialize, propertyFilterChoices: choices } = load('src/features/properties/propertyFilters.ts');
const { summarizeProperties } = load('src/features/properties/portfolioSummary.ts');
const ids = (filters, data = inventory) => Array.from(filter(data, { ...defaults, ...filters }), p => p.id);
test('individual tiers and inventory order', () => {
  for (const [tier, count] of [['All',4],['Ultra-Luxury',2],['Luxury',1],['Premium',1]]) assert.equal(ids({tier}).length,count);
  assert.deepEqual(ids({}), Array.from(inventory,p=>p.id));
});
test('search covers all specified fields, case and whitespace', () => {
  for (const search of ['  SKY  ', '111 West', 'new york', 'usa']) assert(ids({ search }).includes('prop-001'));
  assert.equal(ids({search:'   '}).length,4);
});
test('country, currency, bedrooms and combined AND filters', () => {
  assert.deepEqual(ids({country:'USA'}),['prop-001','prop-003']);
  assert.deepEqual(ids({currency:'CHF'}),['prop-004']);
  assert.deepEqual(ids({minBedrooms:5}),['prop-002','prop-004']);
  assert.deepEqual(ids({tier:'Ultra-Luxury',country:'USA',currency:'USD',minBedrooms:4,search:'penthouse'}),['prop-001']);
  assert.deepEqual(ids({country:'USA',currency:'EUR'}),[]);
});
test('empty, single input, no matches and derived choices', () => {
  assert.deepEqual(ids({},[]),[]);assert.deepEqual(ids({},[inventory[0]]),['prop-001']);assert.deepEqual(ids({search:'missing'}),[]);
  assert.deepEqual(Array.from(choices(inventory).countries),['Italy','Switzerland','USA']);
  assert.deepEqual(Array.from(choices(inventory).currencies),['CHF','EUR','USD']);
});
test('URL contract, defaults/reset, malformed values, unrelated parameters', () => {
  const f={...defaults, search:' Como ',tier:'Ultra-Luxury',country:'Italy',currency:'EUR',minBedrooms:8};
  assert.equal(JSON.stringify(parse(serialize(f),inventory)),JSON.stringify(f));
  assert.equal(serialize(defaults,new URLSearchParams('q=x&tier=Luxury&country=USA&currency=USD&bedrooms=4&other=keep')).toString(),'other=keep');
  for(const value of ['-1','Infinity','4.5','4junk','99999999999999999']) assert.equal(parse(new URLSearchParams('bedrooms='+value),inventory).minBedrooms,0);
  assert.equal(JSON.stringify(parse(new URLSearchParams('tier=bad&country=bad&currency=bad&bedrooms=2'),inventory)),JSON.stringify(defaults));
});
test('immutable source and unchanged full-inventory financial summary', () => {
  const before=JSON.stringify(inventory);inventory.forEach(p=>{Object.freeze(p.location);Object.freeze(p.metrics);Object.freeze(p)});Object.freeze(inventory);
  ids({country:'USA'});assert.equal(JSON.stringify(inventory),before);
  assert.equal(JSON.stringify(summarizeProperties(inventory)),JSON.stringify({valueByCurrency:{USD:20000000,EUR:22000000,CHF:8900000},meanCapRate:4.25,count:4}));
});
