const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Временная "база данных"
const users = [];

// Секретный ключ для JWT
const JWT_SECRET = 'your-secret-key-here';

// Регистрация
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Проверка существования пользователя
        if (users.some(user => user.email === email)) {
            return res.status(400).json({ error: 'Пользователь уже существует' });
        }

        // Хеширование пароля
        const hashedPassword = await bcrypt.hash(password, 10);

        // Сохранение пользователя
        const user = {
            id: Date.now().toString(),
            name,
            email,
            password: hashedPassword,
            createdAt: new Date()
        };

        users.push(user);

        // Создание JWT токена
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Авторизация
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Поиск пользователя
        const user = users.find(user => user.email === email);
        if (!user) {
            return res.status(401).json({ error: 'Неверные учетные данные' });
        }

        // Проверка пароля
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Неверные учетные данные' });
        }

        // Создание JWT токена
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Защищенный маршрут (пример)
app.get('/api/profile', authenticateToken, (req, res) => {
    const user = users.find(user => user.id === req.user.userId);
    if (!user) return res.sendStatus(404);
    res.json({ user: { id: user.id, name: user.name, email: user.email } });
});

// Middleware для проверки JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
