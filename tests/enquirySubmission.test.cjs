const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),ts=require('typescript');
const root=path.join(__dirname,'..');
function load(file){
 const exports={};const requireLocal=id=>{
  if(id.endsWith('/lib/supabase'))return {getSupabase:()=>assert.fail('No live database calls in tests')};
  if(!id.startsWith('.'))return require(id);
  const base=path.resolve(path.dirname(file),id);return load([base,base+'.ts'].find(p=>fs.existsSync(p)));
 };
 vm.runInNewContext(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{exports,require:requireLocal});return exports;
}
const inventory=load(path.join(root,'src/features/properties/dummyData.ts')).DUMMY_PROPERTIES;
const {submitPropertyEnquiry}=load(path.join(root,'src/features/enquiries/enquiryApi.ts'));
const draft={propertyId:'prop-001',fullName:' Test Person ',email:' qa@example.com ',message:' Fictional property enquiry. '};
function client(user={id:'user-a',email_confirmed_at:'2026-10-01'},error=null){
 const writes=[];return {writes,auth:{getUser:async()=>({data:{user},error:null})},from:table=>({insert:async payload=>{writes.push({table,payload});return {error};}})};
}
test('enquiry insert sends only validated editable columns with server-owned defaults',async()=>{
 const c=client();await submitPropertyEnquiry(draft,inventory,'user-a',async()=>c);
 assert.equal(c.writes.length,1);assert.equal(c.writes[0].table,'property_enquiries');
 assert.deepEqual(Object.keys(c.writes[0].payload).sort(),['email','full_name','message','property_id']);
 assert.equal(c.writes[0].payload.full_name,'Test Person');assert.equal(c.writes[0].payload.property_id,'prop-001');
});
test('anonymous, changed-account and unconfirmed sessions cannot insert',async()=>{
 for(const user of [null,{id:'user-b',email_confirmed_at:'date'},{id:'user-a'}]){
  const c=client(user);await assert.rejects(submitPropertyEnquiry(draft,inventory,'user-a',async()=>c));assert.equal(c.writes.length,0);
 }
});
test('invalid enquiry never opens a connection',async()=>{
 await assert.rejects(submitPropertyEnquiry({...draft,propertyId:'unknown'},inventory,'user-a',async()=>assert.fail('Connection should not run')));
});
test('permission and uncertain errors are sanitised and never retried',async()=>{
 for(const [code,message] of [['42501','not been saved'],['23503','no longer available'],['network','could not confirm']]){
  const c=client(undefined,{code,message:'private database details'});
  await assert.rejects(submitPropertyEnquiry(draft,inventory,'user-a',async()=>c),error=>error.message.includes(message)&&!error.message.includes('private'));
  assert.equal(c.writes.length,1);
 }
});
