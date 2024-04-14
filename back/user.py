from pydantic import BaseModel

class User(BaseModel):
    id: int
    nom: str
    email: str
    password: str