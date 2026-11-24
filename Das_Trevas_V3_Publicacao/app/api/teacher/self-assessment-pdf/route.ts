import {env} from 'cloudflare:workers';
import {authorizeTeacher} from '../../../../lib/report-data';
import {SELF_QUESTIONS,SELF_OPTIONS,SELF_ACTION_OPTIONS} from '../../../../lib/self-assessment';
import {pdfResponse,type PdfBlock} from '../../../../lib/report-pdf';
export async function GET(request:Request){
 const auth=await authorizeTeacher(request);if(!auth.ok)return auth.response;
 const search=(new URL(request.url).searchParams.get('search')||'').slice(0,180).toLocaleLowerCase('pt-BR');
 const result=await env.DB.prepare('SELECT s.name,s.class_name AS className,a.grade,a.responses,a.submitted_at AS submittedAt FROM self_assessments a JOIN students s ON s.id=a.student_id ORDER BY s.class_name,s.name').all<{name:string;className:string;grade:string;responses:string;submittedAt:number}>();
 const rows=result.results.filter(r=>(r.name+' '+r.className).toLocaleLowerCase('pt-BR').includes(search));
 const blocks:PdfBlock[]=[{style:'title',text:'Autoavaliações finais da trilha'},{text:'Respostas reflexivas, sem nota ou gabarito.'}];
 for(const row of rows){blocks.push({style:'heading',text:row.name+' - Turma '+row.className+' - Etapa '+row.grade},{text:'Enviada em '+new Date(row.submittedAt).toLocaleString('pt-BR')});const responses=JSON.parse(row.responses);SELF_QUESTIONS.forEach((q,i)=>blocks.push({text:(i+1)+'. '+q},{text:(i===7?SELF_ACTION_OPTIONS:SELF_OPTIONS)[responses[i]] ?? 'Não respondida na versão anterior.'}));}
 if(!rows.length)blocks.push({text:'Nenhuma autoavaliação encontrada para este filtro.'});
 return pdfResponse('autoavaliacoes-finais.pdf',blocks);
}
