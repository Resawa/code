from datetime import datetime, timedelta
from typing import Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from jose import jwt
from passlib.context import CryptContext
from app.models.user import User
from app.schemas.user import UserCreate, UserInDB
from app.core.config import settings
from app.db.session import async_session

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
    bcrypt__rounds=12
)

class AuthService:
    @staticmethod
    async def get_user_by_email(email: str) -> Optional[UserInDB]:
        async with async_session() as session:
            result = await session.execute(
                select(User).where(User.email == email)
            )
            user = result.scalar_one_or_none()
            return UserInDB.model_validate(user) if user else None

    @staticmethod
    async def create_user(user_data: UserCreate) -> UserInDB:
        async with async_session() as session:
            hashed_password = pwd_context.hash(user_data.password)
            user = User(
                email=user_data.email,
                hashed_password=hashed_password,
                full_name=user_data.full_name
            )
            session.add(user)
            await session.commit()
            await session.refresh(user)
            return UserInDB.model_validate(user)

    @staticmethod
    async def authenticate_user(email: str, password: str) -> Optional[UserInDB]:
        user = await AuthService.get_user_by_email(email)
        if not user or not pwd_context.verify(password, user.hashed_password):
            return None
        return user

    @staticmethod
    def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(
                minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
            )
        to_encode.update({"exp": expire})
        return jwt.encode(
            to_encode,
            settings.SECRET_KEY,
            algorithm=settings.ALGORITHM
        )

    @staticmethod
    async def get_current_user(token: str) -> Optional[UserInDB]:
        try:
            payload = jwt.decode(
                token,
                settings.SECRET_KEY,
                algorithms=[settings.ALGORITHM]
            )
            email: str = payload.get("sub")
            if email is None:
                return None
        except jwt.JWTError:
            return None

        return await AuthService.get_user_by_email(email)
