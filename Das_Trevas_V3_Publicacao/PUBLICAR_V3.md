# Publicação da terceira versão — GitHub e Cloudflare

Use este guia em lugar dos guias antigos incluídos na base do projeto.
Crie NOVOS recursos para preservar as versões anteriores.

1. Crie repositório privado GitHub das-trevas-para-a-luz-v3. Clone no GitHub Desktop. Copie o CONTEÚDO desta pasta para a raiz do repositório (package.json deve aparecer na raiz), incluindo .openai. Commit to main e Push origin. Não copie o ZIP nem senhas.
2. No Cloudflare D1 crie das-trevas-para-a-luz-v3-db. Copie o Database ID desse banco novo.
3. No Console ou Studio/Query desse banco, execute cada arquivo da pasta BANCO_D1, em ordem de 01 a 07: abra o arquivo no Bloco de Notas, copie o conteúdo, cole no editor e clique Run. Execute um arquivo por vez. Confira as tabelas students, attempts, answers, settings e self_assessments. Não execute os SQL da pasta drizzle novamente depois destes.
4. Workers & Pages > Create application > importe o repositório GitHub novo. Worker name: das-trevas-para-a-luz-v3. Branch: main. Root directory/Path: deixe padrão se package.json estiver na raiz. Build command: npm run build:cloudflare. Deploy command: npx wrangler deploy --config dist/server/wrangler.json. Preview command (se obrigatório): npx wrangler versions upload --config dist/server/wrangler.json.
5. Variáveis de BUILD: NODE_VERSION = 22; D1_DATABASE_ID = ID do banco novo. Se solicitado, deixe o Cloudflare criar o build token. Não use o ID antigo. Clique Deploy.
6. No Worker NOVO, Settings > Variables and Secrets: adicione como Secret TEACHER_PASSWORD (senha docente forte escolhida por você) e SESSION_SECRET (sequência aleatória diferente, com pelo menos 40 caracteres). Não coloque no GitHub ou nas variáveis de build. Salve e confirme Deploy se solicitado. Em Bindings confira DB apontando para o banco v3.
7. Em Domains/Settings > Domains & Routes confira workers.dev ativado. Copie o endereço em Overview. Abra em janela anônima e use aluno fictício para testar jogo de 10 questões, retomada, progresso, autoavaliação com 8 questões sem bloqueio prévio, área docente protegida por senha e PDFs. Nenhum aluno real deve ser cadastrado antes desses testes.

As respostas das instalações anteriores não são copiadas. Esta pasta é independente do ChatGPT para utilização do site e autenticação docente. Nenhum recurso Cloudflare foi criado ou alterado ao preparar o pacote.
