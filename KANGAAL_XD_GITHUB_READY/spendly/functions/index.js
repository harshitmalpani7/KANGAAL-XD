const {onRequest}=require('firebase-functions/v2/https');
const {defineSecret}=require('firebase-functions/params');
const admin=require('firebase-admin');
const nodemailer=require('nodemailer');
admin.initializeApp();
const SMTP_HOST=defineSecret('SMTP_HOST'),SMTP_PORT=defineSecret('SMTP_PORT'),SMTP_USER=defineSecret('SMTP_USER'),SMTP_PASS=defineSecret('SMTP_PASS'),REPORT_FROM=defineSecret('REPORT_FROM');
exports.sendFinancialReport=onRequest({cors:true,secrets:[SMTP_HOST,SMTP_PORT,SMTP_USER,SMTP_PASS,REPORT_FROM]},async(req,res)=>{
 res.set('Access-Control-Allow-Headers','Content-Type, Authorization');res.set('Access-Control-Allow-Methods','POST, OPTIONS');if(req.method==='OPTIONS')return res.status(204).send('');if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
 try{const header=req.headers.authorization||'';const token=header.startsWith('Bearer ')?header.slice(7):'';if(!token) return res.status(401).json({error:'Sign in required'});const decoded=await admin.auth().verifyIdToken(token);const user=await admin.auth().getUser(decoded.uid);if(!user.email||!user.emailVerified)return res.status(403).json({error:'Verify your email address first'});
 const snap=await admin.firestore().doc(`users/${decoded.uid}`).get();if(!snap.exists)return res.status(404).json({error:'No saved finance history found'});const data=snap.data().financeData||{};const tx=Array.isArray(data.transactions)?data.transactions:[];const inc=tx.filter(t=>t.type==='income').reduce((s,t)=>s+Number(t.amount||0),0);const exp=tx.filter(t=>t.type==='expense').reduce((s,t)=>s+Number(t.amount||0),0);const rows=tx.sort((a,b)=>String(b.date).localeCompare(String(a.date))).map(t=>`${t.date||''} | ${t.type||''} | ${t.name||''} | ${t.category||''} | INR ${Number(t.amount||0).toFixed(2)}`).join('\n');
 const transporter=nodemailer.createTransport({host:SMTP_HOST.value(),port:Number(SMTP_PORT.value()||587),secure:Number(SMTP_PORT.value())===465,auth:{user:SMTP_USER.value(),pass:SMTP_PASS.value()}});
 await transporter.sendMail({from:REPORT_FROM.value(),to:user.email,subject:'Your HISAB RADAR financial history',text:`HISAB RADAR — Financial history\n\nTotal income: INR ${inc.toFixed(2)}\nTotal expenses: INR ${exp.toFixed(2)}\nEstimated balance: INR ${(inc-exp).toFixed(2)}\n\nTransactions:\n${rows||'No transactions recorded.'}\n\nSavings goals:\n${(data.goals||[]).map(g=>`${g.name}: INR ${g.saved||0} / INR ${g.target||0}`).join('\n')}`});return res.json({ok:true});
 }catch(e){console.error(e);return res.status(500).json({error:'Could not send report. Check function configuration.'});}
});
