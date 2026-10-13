const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),ts=require('typescript');
const React=require('react');const {renderToStaticMarkup}=require('react-dom/server');const {MemoryRouter}=require('react-router-dom');
const root=path.join(__dirname,'..');
let client;
function load(name,extra={}){
 const file=path.join(root,name),exports={};
 const requireLocal=id=>{
  if(id.endsWith('/lib/supabase'))return {getSupabase:async()=>client};
  if(!id.startsWith('.'))return require(id);
  const base=path.resolve(path.dirname(file),id);
  return load(path.relative(root,[base,base+'.ts',base+'.tsx'].find(p=>fs.existsSync(p))),extra);
 };
 vm.runInNewContext(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}}).outputText,{exports,require:requireLocal,URL,window:{location:{origin:'https://aurelia.example'}},...extra});return exports;
}
const model=load('src/features/auth/authSession.ts');
const actions=load('src/features/auth/authActions.ts');
const session={access_token:'fictional-test-token',refresh_token:'fictional-test-refresh',expires_at:9999999999,user:{id:'fictional-user-a',email:'qa@example.com',user_metadata:{full_name:' Test User ',role:'admin'}}};
const tick=()=>new Promise(resolve=>setImmediate(resolve));
function sessionClient(getSession=async()=>({data:{session},error:null}),getUser=async()=>({data:{user:session.user},error:null})){
 let listener,unsubscribed=false;
 return {auth:{getSession,getUser,onAuthStateChange:callback=>{listener=callback;callback('INITIAL_SESSION',session);return {data:{subscription:{unsubscribe:()=>{unsubscribed=true}}}}}},emit:(event,value)=>listener(event,value),unsubscribed:()=>unsubscribed};
}
test('session user mapping never grants privileges from editable metadata',()=>{
 const user=model.accountUser(session);assert.equal(user.id,session.user.id);assert.equal(user.name,'Test User');assert.equal(user.email,'qa@example.com');assert(!('role' in user));
 assert.equal(model.accountUser({...session,user:{...session.user,user_metadata:{full_name:123}}}).name,'Account');
});
test('restored sessions are verified and auth events synchronise logout',async()=>{
 const applied=[];let checks=0;const c=sessionClient(undefined,async()=>{checks++;return {data:{user:session.user},error:null}});
 const cleanup=model.subscribeAuthSession(c,s=>applied.push(s),()=>assert.fail('Unexpected restoration failure'));
 assert.equal(applied.length,0);await tick();assert.equal(checks,1);assert.equal(applied[0].user.id,session.user.id);
 c.emit('SIGNED_OUT',null);assert.equal(applied.at(-1),null);cleanup();assert(c.unsubscribed());
});
test('logout wins against late session restoration and cleanup prevents updates',async()=>{
 let resolve;const pending=new Promise(r=>{resolve=r});const applied=[];const c=sessionClient(()=>pending);
 const cleanup=model.subscribeAuthSession(c,s=>applied.push(s),()=>assert.fail('Unexpected failure'));
 c.emit('SIGNED_OUT',null);resolve({data:{session},error:null});await tick();assert.equal(applied.length,1);assert.equal(applied[0],null);cleanup();
 let finish;const appliedAfter=[];const c2=sessionClient(()=>new Promise(r=>{finish=r}));const dispose=model.subscribeAuthSession(c2,s=>appliedAfter.push(s),()=>assert.fail('Unexpected failure'));
 dispose();finish({data:{session},error:null});await tick();assert.equal(appliedAfter.length,0);
});
test('restoration errors deny access and do not reveal server details',async()=>{
 const errors=[];const c=sessionClient(async()=>({data:{session:null},error:new Error('private details')}));
 const cleanup=model.subscribeAuthSession(c,()=>assert.fail('Unexpected session'),message=>errors.push(message));await tick();assert.equal(errors.length,1);assert(!errors[0].includes('private'));cleanup();
});
test('authentication actions call real auth methods and omit company/profile/enquiry writes',async()=>{
 const calls=[];client={auth:{
  signInWithPassword:async data=>{calls.push(['login',data]);return {data:{session},error:null}},
  signUp:async data=>{calls.push(['signup',data]);return {data:{session:null},error:null}},
  resend:async data=>{calls.push(['resend',data]);return {error:null}},
  signOut:async data=>{calls.push(['logout',data]);return {error:null}},
 }};
 assert.equal(await actions.signIn('qa@example.com','fictional-password'),session);
 assert.equal(await actions.registerAccount('qa@example.com','fictional-password','Test User'),null);
 await actions.resendConfirmation('qa@example.com');await actions.signOut();
 assert.equal(calls[1][1].options.data.full_name,'Test User');assert.equal(calls[1][1].options.emailRedirectTo,'https://aurelia.example/auth/callback');
 assert(!('entity' in calls[1][1].options.data));assert.equal(calls[2][1].type,'signup');assert.equal(calls[3][1].scope,'local');
});
test('one-use confirmation exchange is shared across StrictMode calls',async()=>{
 let calls=0;client={auth:{exchangeCodeForSession:async()=>{calls++;return {data:{session},error:null}}}};
 const a=actions.confirmAccount('fictional-one-use-code'),b=actions.confirmAccount('fictional-one-use-code');assert.equal(a,b);assert.equal(await a,session);assert.equal(calls,1);
});
test('auth failures and expired confirmation links have helpful sanitised messages',async()=>{
 client={auth:{signInWithPassword:async()=>({data:{session:null},error:{code:'invalid_credentials',message:'private details'}}),exchangeCodeForSession:async()=>({data:{session:null},error:{code:'otp_expired'}})}};
 await assert.rejects(actions.signIn('qa@example.com','fictional'),/email address or password is incorrect/);
 await assert.rejects(actions.confirmAccount('fictional-expired-code'),/expired/);
 assert(model.authErrorMessage({code:'email_not_confirmed'}).includes('Confirm your email'));
 assert(!model.authErrorMessage(new Error('private details')).includes('private'));
});
test('return paths reject external destinations',()=>{
 assert.equal(model.safeReturnPath('//['),'/dashboard/portfolio');assert.equal(model.safeReturnPath('/dashboard/../../outside'),'/dashboard/portfolio');assert.equal(model.safeReturnPath('//external.example'),'/dashboard/portfolio');assert.equal(model.safeReturnPath('https://external.example'),'/dashboard/portfolio');assert.equal(model.safeReturnPath('/dashboard/intelligence'),'/dashboard/intelligence');
});
test('protected routes wait for restoration and deny anonymous/error states',()=>{
 for(const [state,text] of [[{authStatus:'anonymous',isSigningOut:true},'Signing out'],[{authStatus:'loading'},'Restoring your session'],[{authStatus:'error',authError:'Restoration unavailable'},'Restoration unavailable'],[{authStatus:'anonymous'},null],[{authStatus:'authenticated'},'Private content']]){
  const exports={};const file=path.join(root,'src/features/auth/ProtectedRoute.tsx');
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}}).outputText,{exports,require:id=>id.endsWith('/useStore')?{useUIStore:()=>state}:require(id)});
  const html=renderToStaticMarkup(React.createElement(MemoryRouter,null,React.createElement(exports.ProtectedRoute,null,'Private content')));
  if(text)assert(html.includes(text));else assert(!html.includes('Private content'));
 }
});

test('Zustand reflects session state while preserving UI preferences',()=>{
 const store=load('src/hooks/useStore.ts').useUIStore;
 assert.equal(store.getState().authStatus,'loading');
 store.getState().setSidebarOpen(false);store.getState().setActiveFilter('Luxury');
 store.getState().setSession(model.accountUser(session));assert.equal(store.getState().authStatus,'authenticated');assert(store.getState().isAuthenticated);
 store.getState().setSession(null);assert.equal(store.getState().authStatus,'anonymous');assert.equal(store.getState().user,null);assert.equal(store.getState().sidebarOpen,false);assert.equal(store.getState().activeFilter,'Luxury');
 store.getState().setAuthError('Restoration unavailable');assert.equal(store.getState().authStatus,'error');assert.equal(store.getState().isAuthenticated,false);
});

test('confirmation preserves explicit PKCE flow identifiers after URL cleanup',async()=>{
 let received;client={auth:{exchangeCodeForSession:async(code,options)=>{received={code,flowId:options.flowId};return {data:{session},error:null}}}};
 await actions.confirmAccount('fictional-flow-code','fictionalFlow123');assert.equal(received.code,'fictional-flow-code');assert.equal(received.flowId,'fictionalFlow123');
 assert(model.authErrorMessage({code:'pkce_code_verifier_not_found'}).includes('same browser'));
});

test('completed confirmation cannot replay a cached session after sign-out',async()=>{
 let calls=0;client={auth:{exchangeCodeForSession:async()=>{calls++;return calls===1?{data:{session},error:null}:{data:{session:null},error:{code:'flow_state_expired'}}}}};
 await actions.confirmAccount('fictional-used-link');await assert.rejects(actions.confirmAccount('fictional-used-link'),/expired/);assert.equal(calls,2);
});
