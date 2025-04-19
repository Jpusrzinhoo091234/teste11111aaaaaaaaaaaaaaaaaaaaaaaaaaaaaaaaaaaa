const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const carregarUsuarios = () => {
  try {
    const dados = fs.readFileSync('./usuarios.json', 'utf8');
    return JSON.parse(dados);
  } catch (error) {
    return [];
  }
};

app.post('/cadastro', (req, res) => {
  const { usuario, senha } = req.body;
  const usuarios = carregarUsuarios();

  const usuarioExistente = usuarios.find(u => u.usuario === usuario);
  
  if (usuarioExistente) {
    return res.status(400).send('Usuário já existe');
  }

  usuarios.push({ usuario, senha });
  fs.writeFileSync('./usuarios.json', JSON.stringify(usuarios, null, 2));

  res.send('Cadastro realizado com sucesso!');
});

app.post('/login', (req, res) => {
  const { usuario, senha } = req.body;
  const usuarios = carregarUsuarios();

  const usuarioValido = usuarios.find(u => u.usuario === usuario && u.senha === senha);
  
  if (!usuarioValido) {
    return res.status(401).send('Credenciais inválidas');
  }

  res.send('Login realizado com sucesso!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});