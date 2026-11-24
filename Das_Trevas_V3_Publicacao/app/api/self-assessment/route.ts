import { env } from 'cloudflare:workers';
import { TRAILS } from '../../../lib/self-assessment';
async function state(studentId:string,grade:string){
 const games=TRAILS[grade];
 const rows=await env.DB.prepare("SELECT DISTINCT game FROM attempts WHERE student_id=? AND grade=? AND status='completed'").bind(studentId,grade).all<{game:string}>();
 const completed=new Set(rows.results.map(r=>r.game));
 const eligible=true;
 const assessment=await env.DB.prepare('SELECT responses, submitted_at AS submittedAt FROM self_assessments WHERE student_id=? AND grade=?').bind(studentId,grade).first<{responses:string;submittedAt:number}>();
 return {eligible,remaining:games.filter(g=>!completed.has(g)),assessment:assessment?{responses:JSON.parse(assessment.responses),submittedAt:assessment.submittedAt}:null};
}
export async function GET(request:Request){
 const p=new URL(request.url).searchParams,studentId=p.get('studentId')||'',grade=p.get('grade')||'';
 if(!studentId||studentId.length>80||!['6','9','3'].includes(grade))return Response.json({error:'Identificação inválida.'},{status:400});
 return Response.json(await state(studentId,grade),{headers:{'Cache-Control':'no-store'}});
}
export async function POST(request:Request){
 let b:Record<string,unknown>;try{const raw=await request.json();if(!raw||typeof raw!=='object')throw Error();b=raw as Record<string,unknown>}catch{return Response.json({error:'Dados inválidos.'},{status:400})}
 const {studentId,grade,responses}=b;
 if(typeof studentId!=='string'||!studentId||studentId.length>80||typeof grade!=='string'||!['6','9','3'].includes(grade)||!Array.isArray(responses)||responses.length!==8||!responses.every(n=>Number.isInteger(n)&&n>=0&&n<4))return Response.json({error:'Responda às oito questões.'},{status:400});
 const current=await state(studentId,grade);
 if(current.assessment && current.assessment.responses.length>=8)return Response.json({error:'Autoavaliação já enviada. Suas respostas foram preservadas.'},{status:409});
 const submittedAt=Date.now();
 const name=String(b.name||'').trim().slice(0,100),className=String(b.className||'').trim().slice(0,80);
 const student=await env.DB.prepare('SELECT id FROM students WHERE id=?').bind(studentId).first();
 if(!student){
  if(!name||!className)return Response.json({error:'Preencha seu nome e sua turma antes de enviar.'},{status:400});
  await env.DB.prepare('INSERT OR IGNORE INTO students(id,name,class_name,grade,created_at,updated_at) VALUES(?,?,?,?,?,?)').bind(studentId,name,className,grade,submittedAt,submittedAt).run();
 }
 await env.DB.prepare('INSERT INTO self_assessments (student_id,grade,responses,submitted_at) VALUES (?,?,?,?) ON CONFLICT(student_id,grade) DO UPDATE SET responses=excluded.responses,submitted_at=excluded.submitted_at').bind(studentId,grade,JSON.stringify(responses),submittedAt).run();
 return Response.json({ok:true,submittedAt});
}
