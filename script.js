document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements with error handling
    const elements = {
        welcomeScreen: document.getElementById('welcomeScreen'),
        userNameSpan: document.getElementById('userName'),
        logoutButton: document.getElementById('logoutButton'),
        forms: document.querySelectorAll('.form-container'),
        loginForm: document.getElementById('login'),
        registerForm: document.getElementById('register'),
        showRegister: document.getElementById('showRegister'),
        showLogin: document.getElementById('showLogin')
    };

    // Verify essential elements exist
    if (!elements.forms.length || !elements.loginForm || !elements.registerForm) {
        console.error('Essential form elements missing');
        return;
    }

    // Optimized form toggle function
    function toggleForms(show, hide) {
        elements.forms.forEach((form, index) => {
            form.style.display = index === show ? 'block' : 'none';
        });
    }

    // Add loading state management
    function setLoading(form, isLoading) {
        const button = form.querySelector('button[type="submit"]');
        if (button) {
            button.disabled = isLoading;
            button.textContent = isLoading ? 'Carregando...' : 'Enviar';
        }
    }

    // Enhanced request handler
    async function handleRequest(url, method, body) {
        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            
            // Check if response has content
            const text = await response.text();
            if (!text) {
                throw new Error('Resposta vazia do servidor');
            }
            
            // Try to parse JSON
            let data;
            try {
                data = JSON.parse(text);
            } catch (parseError) {
                throw new Error('Resposta inválida do servidor');
            }
            
            if (!response.ok) {
                throw new Error(data.message || 'Erro na requisição');
            }
            return data;
        } catch (error) {
            console.error('Erro:', error);
            return { message: error.message || 'Erro na conexão' };
        }
    }

    // Event listeners
    if (elements.showRegister) {
        elements.showRegister.addEventListener('click', (e) => {
            e.preventDefault();
            toggleForms(1, 0);
        });
    }

    if (elements.showLogin) {
        elements.showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            toggleForms(0, 1);
        });
    }

    // Login logic
    elements.loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        setLoading(elements.loginForm, true);
        const data = await handleRequest('/.netlify/functions/login', 'POST', {
            email: document.getElementById('loginEmail').value,
            password: document.getElementById('loginPassword').value
        });
        setLoading(elements.loginForm, false);
        alert(data.message);
        if (data.message === 'Login bem-sucedido!') {
            toggleForms(0, 1);
        }
    });

    // Registration logic
    elements.registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        setLoading(elements.registerForm, true);
        const data = await handleRequest('/.netlify/functions/register', 'POST', {
            name: document.getElementById('registerName').value,
            email: document.getElementById('registerEmail').value,
            password: document.getElementById('registerPassword').value
        });
        setLoading(elements.registerForm, false);
        alert(data.message);
        if (data.message === 'Cadastro realizado com sucesso!') {
            toggleForms(0, 1);
        }
    });
});