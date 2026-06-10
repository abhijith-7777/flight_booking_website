from pydantic import BaseModel

class BookingCreate(BaseModel):
    user_id: int
    flight_id: int
    seat_number: str

class UserCreate(BaseModel):
    name: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str