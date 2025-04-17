// Обработка формы регистрации
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('reg-name').value.trim(),
        email: document.getElementById('reg-email').value.trim(),
        password: document.getElementById('reg-password').value,
        confirm: document.getElementById('reg-confirm').value
    };

    if (formData.password !== formData.confirm) {
        alert("Пароли не совпадают!");
        return;
    }

    try {
        const response = await fetch('http://localhost:8000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
                full_name: formData.name
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || 'Ошибка регистрации');
        }

        alert("Регистрация успешна! Теперь вы можете войти.");
        window.location.href = "auth.html";
    } catch (error) {
        console.error('Ошибка:', error);
        alert(error.message);
    }
});

// Обработка формы входа
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        const response = await fetch('http://localhost:8000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || 'Неверный email или пароль');
        }

        localStorage.setItem('authToken', data.access_token);
        alert("Вход выполнен успешно!");
        window.location.href = "dashboard.html";
    } catch (error) {
        console.error('Ошибка:', error);
        alert(error.message);
    }
});
