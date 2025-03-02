from pydantic import BaseModel
from typing import Optional

class Member(BaseModel):
    userId: str
    name: str
    dateOfBirth: str
