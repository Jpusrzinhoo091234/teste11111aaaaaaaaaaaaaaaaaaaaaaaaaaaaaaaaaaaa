const fs   = require('fs');
const path = require('path');

exports.handler = async ({ body }) => {
  const { username,password } = JSON.parse(body);
  const file = path.join(__dirname,'../../users.json');

  let users;
  try {
    users = JSON.parse(fs.readFileSync(file,'utf-8'));
  } catch {
    return { statusCode:400, body: JSON.stringify({success:false,message:'Erro ao ler arquivo de usuários'}) };
  }

  const user = users.find(u=>u.username===username && u.password===password);
  if(!user) {
    return { statusCode:401, body: JSON.stringify({success:false,message:'Usuário ou senha incorretos'}) };
  }

  return { statusCode:200, body: JSON.stringify({success:true}) };
};