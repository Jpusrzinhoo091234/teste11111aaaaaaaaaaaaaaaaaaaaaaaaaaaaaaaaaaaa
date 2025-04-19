const fs = require('fs');

exports.handler = async (event) => {
    const { email, password } = JSON.parse(event.body);
    const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Login bem-sucedido!' })
        };
    } else {
        return {
            statusCode: 401,
            body: JSON.stringify({ message: 'Email ou senha incorretos!' })
        };
    }
};