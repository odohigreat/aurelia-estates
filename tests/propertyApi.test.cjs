const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.join(__dirname, '..');
function load(name) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(root,name),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{exports,require,URL,URLSearchParams,fetch});
  return exports;
}
const { fetchPublishedProperties } = load('src/features/properties/propertyApi.ts');
const inventory = load('src/features/properties/dummyData.ts').DUMMY_PROPERTIES;
const config = {url:'https://example.supabase.co',publishableKey:'sb_publishable_test_only'};
const row = p => ({id:p.id,title:p.title,price:p.price,currency:p.currency,tier:p.tier,address:p.location.address,city:p.location.city,country:p.location.country,latitude:p.location.lat,longitude:p.location.lng,cap_rate:p.metrics.capRate,appreciation_forecast:p.metrics.appreciationForecast,sqft:p.metrics.sqft,bedrooms:p.metrics.bedrooms,bathrooms:p.metrics.bathrooms,images:p.images,is_published:true});
const response = data => new Response(JSON.stringify(data),{status:200,headers:{'Content-Type':'application/json'}});
test('published reads map all inventory fields without changing values',async()=>{
 let calls=0;
 const result=await fetchPublishedProperties(config,undefined,async(url,options)=>{
  calls++;assert.equal(options.method,'GET');assert.equal(options.headers.apikey,config.publishableKey);
  assert.equal(url.searchParams.get('is_published'),'eq.true');assert.equal(url.searchParams.get('order'),'id.asc');
  return response(inventory.map(row));
 });
 assert.equal(calls,1);assert.deepEqual(JSON.parse(JSON.stringify(result)),JSON.parse(JSON.stringify(inventory)));
});
test('missing, malformed and secret configuration fails before a request',async()=>{
 for(const input of [{},{...config,url:'http://example.supabase.co'},{...config,url:'https://example.invalid'},{...config,publishableKey:'sb_secret_never_use'}]){
  let calls=0;await assert.rejects(fetchPublishedProperties(input,undefined,async()=>{calls++;return response([])}),e=>e.kind==='configuration');assert.equal(calls,0);
 }
});
test('empty database results remain empty with no fixture fallback',async()=>{
 assert.equal((await fetchPublishedProperties(config,undefined,async()=>response([]))).length,0);
});
test('HTTP, network, JSON and invalid data failures are explicit and sanitised',async()=>{
 for(const [request,kind] of [
  [async()=>new Response('private server details',{status:403}),'api'],
  [async()=>{throw new Error('private network details')},'network'],
  [async()=>new Response('not JSON',{status:200}),'data'],
  [async()=>response([{...row(inventory[0]),is_published:false}]),'data'],
  [async()=>response([{...row(inventory[0]),price:'invalid'}]),'data'],
  [async()=>response([{...row(inventory[0]),images:['javascript:alert(1)']}]),'data'],
 ])await assert.rejects(fetchPublishedProperties(config,undefined,request),e=>e.kind===kind&&!e.message.includes('private'));
});
test('pagination reads beyond the first page',async()=>{
 let calls=0;
 const result=await fetchPublishedProperties(config,undefined,async url=>{
  assert.equal(url.searchParams.get('offset'),String(calls*100));
  calls++;return response(calls===1?Array.from({length:100},(_,i)=>({...row(inventory[0]),id:'page-'+i})):[row(inventory[1])]);
 });
 assert.equal(calls,2);assert.equal(result.length,101);assert.equal(result[100].id,'prop-002');
});
test('query cancellation is forwarded and not converted into a network error',async()=>{
 const controller=new AbortController();controller.abort();const aborted=new DOMException('Aborted','AbortError');
 await assert.rejects(fetchPublishedProperties(config,controller.signal,async(_,options)=>{assert.equal(options.signal,controller.signal);throw aborted}),e=>e===aborted);
});
