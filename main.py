# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth  # Импортируем только auth, так как reports пока не готов

# Инициализация приложения
app = FastAPI(
    title="BizAI Backend",
    description="Backend API для системы бизнес-аналитики",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# Настройки CORS для подключения фронтенда
origins = [
    "http://localhost:3000",    # Стандартный порт React
    "http://127.0.0.1:3000",
    "http://localhost:5173",    # Порт Vite
    "http://127.0.0.1:5173",
    "http://localhost:8080",    # Порт Vue
    "http://127.0.0.1:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],        # Разрешаем все методы (GET, POST и т.д.)
    allow_headers=["*"],        # Разрешаем все заголовки
    expose_headers=["*"]        # Важно для работы с JWT токенами
)

# Подключаем роутер аутентификации
app.include_router(
    auth.router,
    prefix="/api/auth",
    tags=["Authentication"]
)

# Тестовые endpoint'ы для проверки подключения
@app.get("/")
async def root():
    return {
        "message": "BizAI Backend is running!",
        "docs": "/api/docs",
        "auth_endpoints": "/api/auth"
    }

@app.get("/health")
async def health_check():
    return {"status": "ok", "message": "Service is healthy"}

# Endpoint специально для проверки подключения фронтенда
@app.get("/api/test-frontend-connection")
async def test_connection():
    return {
        "success": True,
        "message": "Frontend is successfully connected to backend",
        "frontend_origins": origins
    }
