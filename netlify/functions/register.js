const fs = require('fs');

exports.handler = async (event) => {
    const { name, email, password } = JSON.parse(event.body);
    const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));

    const userExists = users.some(user => user.email === email);
    if (userExists) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Este email já está registrado!' })
        };
    }

    const newUser = { name, email, password };
    users.push(newUser);

    fs.writeFileSync('users.json', JSON.stringify(users));

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Cadastro realizado com sucesso!' })
    };
};