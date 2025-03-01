from fastapi import APIRouter
from models.users import User
from config.database import collection_name
from schema.schemas import list_serial
from bson import ObjectId

router = APIRouter()

#GET Request Method
@router.get("/")
async def get_users():
  users = list_serial(collection_name.find())
  return users