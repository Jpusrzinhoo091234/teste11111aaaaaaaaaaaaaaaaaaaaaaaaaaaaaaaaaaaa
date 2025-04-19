document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const forms = document.querySelectorAll('.form-container');

    // Load accounts from users.json
    let accounts = [];
    fetch('users.json')
        .then(response => response.json())
        .then(data => {
            accounts = data;
            // Check if base account exists
            const baseAccountExists = accounts.some(acc => acc.email === 'admin@teste.com');
            if (!baseAccountExists) {
                const baseAccount = {
                    name: 'Admin',
                    email: 'admin@teste.com',
                    password: 'admin123'
                };
                accounts.push(baseAccount);
                // Save the base account
                fetch('users.json', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(accounts)
                });
            }
        })
        .catch(error => console.error('Error loading users:', error));

    showRegister.addEventListener('click', function(e) {
        e.preventDefault();
        forms[0].style.display = 'none';
        forms[1].style.display = 'block';
    });

    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        forms[1].style.display = 'none';
        forms[0].style.display = 'block';
    });

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        const user = accounts.find(acc => acc.email === email && acc.password === password);
        if (user) {
            alert('Login realizado com sucesso!');
            // Here you can redirect or show logged in content
        } else {
            alert('Email ou senha incorretos!');
        }
    });

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        // Check if email already exists
        const emailExists = accounts.some(acc => acc.email === email);
        if (emailExists) {
            alert('Este email já está registrado!');
            return;
        }

        // Create new account object
        const newAccount = {
            name: name,
            email: email,
            password: password
        };

        // Add to accounts array and save to users.json
        accounts.push(newAccount);
        fetch('users.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(accounts)
        })
        .then(response => {
            if (response.ok) {
                alert('Registro realizado com sucesso!');
                forms[1].style.display = 'none';
                forms[0].style.display = 'block';
            }
        })
        .catch(error => console.error('Error saving user:', error));
    });
});