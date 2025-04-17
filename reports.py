# backend/app/routes/reports.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_reports():
    return {"message": "Reports endpoint works!"}
