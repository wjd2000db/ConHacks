from pydantic import BaseModel
from typing import Optional, List

class Member(BaseModel):
    userId: str
    name: str
    dateOfBirth: str
    gender:str
    medications: Optional[List[str]] = None 

