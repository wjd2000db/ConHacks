def individual_serial_user(user) -> dict:
  return {
    "id": str(user["_id"]),
    "firstName": user["firstName"],
    "lastName": user["lastName"],
    "dateOfBirth": user["dateOfBirth"],
    "gender": user["gender"],
    "email": user["email"]
  }

def list_serial_user(users) -> list:
  return[individual_serial_user(user) for user in users]

def individual_serial_member(member) -> dict:
  return {
    "id": str(member["_id"]),
    "userId": member["userId"],
    "name": member["name"],
    "dateOfBirth": member["dateOfBirth"],
    "gender": member.get("gender"),  
    "medications": member.get("medications", None)
  }

def list_serial_member(members) -> list:
  return[individual_serial_member(member) for member in members]