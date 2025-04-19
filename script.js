document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login');
    const registerForm = document.getElementById('register');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const forms = document.querySelectorAll('.form-container');

    // Exibir formulário de cadastro
    showRegister.addEventListener('click', function(e) {
        e.preventDefault();
        forms[0].style.display = 'none';
        forms[1].style.display = 'block';
    });

    // Exibir formulário de login
    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        forms[1].style.display = 'none';
        forms[0].style.display = 'block';
    });

    // Lógica de login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        fetch('/.netlify/functions/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Login bem-sucedido!') {
                alert('Login realizado com sucesso!');
                // Redirecionar ou mostrar conteúdo protegido
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error('Erro ao realizar login:', error));
    });

    // Lógica de cadastro
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        fetch('/.netlify/functions/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.message === 'Cadastro realizado com sucesso!') {
                forms[1].style.display = 'none';
                forms[0].style.display = 'block';
            }
        })
        .catch(error => console.error('Erro ao cadastrar usuário:', error));
    });
});