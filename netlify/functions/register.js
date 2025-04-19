const fs   = require('fs');
const path = require('path');

exports.handler = async ({ body }) => {
  try {
    const { fullName, username, password, email } = JSON.parse(body);

    if (!fullName || !username || !password || !email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: 'Todos os campos são obrigatórios!' })
      };
    }

    const file = path.join(__dirname, '../../users.json');
    console.log('Caminho do arquivo:', file);
    let users = [];

    try {
      users = JSON.parse(fs.readFileSync(file,'utf-8'));
    } catch (err) {
      console.error('Erro ao ler o arquivo:', err);
      users = [];
    }

    if(users.some(u=>u.username===username)) {
      return { statusCode:400, body: JSON.stringify({success:false,message:'Usuário já existe'}) };
    }

    users.push({ fullName, username, password, email });
    fs.writeFileSync(file, JSON.stringify(users,null,2));

    return { statusCode:200, body: JSON.stringify({success:true, message: 'Usuário cadastrado com sucesso!'}) };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: 'Erro interno do servidor!' })
    };
  }
};