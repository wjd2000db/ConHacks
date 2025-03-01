def individual_serial(user) -> dict:
  return {
    "id": str(user["_id"]),
    "firstName": user["firstName"],
    "lastName": user["lastName"],
    "dateOfBirth": user["dateOfBirth"],
    "gender": user["gender"],
    "email": user["email"]
  }

def list_serial(users) -> list:
  return[individual_serial(user) for user in users]