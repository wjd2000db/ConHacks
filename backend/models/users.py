from pydantic import BaseModel

class User(BaseModel):
  firstName: str
  lastName: str
  dateOfBirth: str
  gender: str
  email: str
