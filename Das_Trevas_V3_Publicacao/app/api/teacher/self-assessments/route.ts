import {env} from 'cloudflare:workers';
import {authorizeTeacher} from '../../../../lib/report-data';
import {SELF_QUESTIONS,SELF_OPTIONS} from '../../../../lib/self-assessment';
export async function GET(request:Request){
 const auth=await authorizeTeacher(request);if(!auth.ok)return auth.response;
 const rows=await env.DB.prepare('SELECT a.student_id AS studentId,s.name,s.class_name AS className,a.grade,a.responses,a.submitted_at AS submittedAt FROM self_assessments a JOIN students s ON s.id=a.student_id ORDER BY s.class_name,s.name,a.submitted_at DESC').all<{responses:string}>();
 return Response.json({questions:SELF_QUESTIONS,options:SELF_OPTIONS,assessments:rows.results.map(r=>({...r,responses:JSON.parse(r.responses)}))},{headers:{'Cache-Control':'no-store'}});
}
