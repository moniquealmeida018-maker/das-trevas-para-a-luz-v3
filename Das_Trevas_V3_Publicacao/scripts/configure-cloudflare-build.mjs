import {readFile,writeFile} from 'node:fs/promises';
const path=new URL('../dist/server/wrangler.json',import.meta.url);
const id=process.env.D1_DATABASE_ID;
if(!id || !/^[a-f0-9-]{36}$/i.test(id)) throw new Error('Configure D1_DATABASE_ID com o ID do novo banco.');
const config=JSON.parse(await readFile(path,'utf8'));
config.name=config.topLevelName='das-trevas-para-a-luz-v3';
config.workers_dev=true;
config.d1_databases=[{binding:'DB',database_name:'das-trevas-para-a-luz-v3-db',database_id:id}];
await writeFile(path,JSON.stringify(config,null,2)+'\n');
