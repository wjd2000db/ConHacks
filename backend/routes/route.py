from fastapi import APIRouter
from models.users import User
from models.members import Member
from config.database import collection_name
from schema.schemas import list_serial
from bson import ObjectId

router = APIRouter()

#GET Request Method
@router.get("/")
async def get_users():
  users = list_serial(collection_name.find())
  return users

#POST Request Method
@router.post("/")
async def post_user(user: User):
  collection_name.insert_one(dict(user))

  if not result.inserted_id:
      raise HTTPException(status_code=500, detail="User could not be created")
  
  return {"message": "User created successfully", "id": str(result.inserted_id)}


#PUT Request Method
@router.put("/{id}")
async def put_user(id: str, user: User):
  collection_name.find_one_and_update({"_id": ObjectId(id)},{"$set": dict(user)})

#DELETE Request Method
@router.delete("/{id}")
async def delete_user(id:str):
  collection_name.find_one_and_delete({"_id":ObjectId(id)})


# MEMBER

@router.get("/members")
async def get_members():
    members = list_serial(collection_name.find())
    return members

# GET
@router.get("/members/{user_id}")
async def get_member_by_user(user_id: str):
    members = list_serial(collection_name.find({"userId": user_id}))
    if not members:
        raise HTTPException(status_code=404, detail="No members found for this user")
    return members

# POST
@router.post("/members")
async def post_member(member: Member):
    result = collection_name.insert_one(dict(member))

    if not result.inserted_id:
        raise HTTPException(status_code=500, detail="Member could not be created")
    
    return {"message": "Member created successfully", "id": str(result.inserted_id)}

# PUT
@router.put("/members/{id}")
async def put_member(id: str, member: Member):
    updated_member = collection_name.find_one_and_update(
        {"_id": ObjectId(id)}, {"$set": dict(member)}
    )

    if not updated_member:
        raise HTTPException(status_code=404, detail="Member not found")
    
    return {"message": "Member updated successfully"}

# DELETE
@router.delete("/members/{id}")
async def delete_member(id: str):
    deleted_member = collection_name.find_one_and_delete({"_id": ObjectId(id)})

    if not deleted_member:
        raise HTTPException(status_code=404, detail="Member not found")
    
    return {"message": "Member deleted successfully"}