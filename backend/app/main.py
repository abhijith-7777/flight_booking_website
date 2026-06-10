from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import inspect, text
from sqlalchemy.orm import Session
from .database import SessionLocal


from app.database import engine, get_db
from app import models
from app import schemas
import random
import string

models.Base.metadata.create_all(bind=engine)

def ensure_booking_schema():
    inspector = inspect(engine)
    booking_columns = {
        column["name"]
        for column in inspector.get_columns("bookings")
    }

    with engine.begin() as connection:
        if "pnr" not in booking_columns:
            connection.execute(
                text("ALTER TABLE bookings ADD COLUMN pnr VARCHAR(20)")
            )

        indexes = inspector.get_indexes("bookings")
        has_pnr_index = any(
            index.get("unique") and index.get("column_names") == ["pnr"]
            for index in indexes
        )

        if not has_pnr_index:
            connection.execute(
                text("CREATE UNIQUE INDEX ix_bookings_pnr ON bookings (pnr)")
            )

ensure_booking_schema()

app = FastAPI()

def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def generate_pnr():
    return "SKY" + "".join(
        random.choices(
            string.ascii_uppercase + string.digits,
            k=6
        )
    )

import razorpay
from fastapi import Request

client = razorpay.Client(
    auth=("rzp_test_SpxtMp8AwxBH6b", "mGvFYNFbI5pR3z1OpDMF5WNH")
)

@app.post("/create-order")
async def create_order(request: Request):

    data = await request.json()

    amount = data["amount"]

    order = client.order.create({
        "amount": amount * 100,
        "currency": "INR",
        "payment_capture": 1
    })

    return order


@app.get("/")
def root():
    return {"message": "Flight API Running"}


@app.post("/book")
def book_flight(data: schemas.BookingCreate, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(
        models.User.id == data.user_id
    ).first()

    if not user:
        return {"success": False, "error": "Please login before booking"}

    flight = db.query(models.Flight).filter(
        models.Flight.id == data.flight_id
    ).first()

    if not flight:
        return {"success": False, "error": "Flight not found"}

    # check seat availability
    seat = db.query(models.Seat).filter(
        models.Seat.flight_id == data.flight_id,
        models.Seat.seat_number == data.seat_number
    ).first()

    if not seat:
        return {"success": False, "error": "Seat not found"}

    if seat.is_booked:
        return {"success": False, "error": "Seat already booked"}

    # mark seat as booked
    seat.is_booked = True

    # create booking
    booking = models.Booking(
        user_id=data.user_id,
        flight_id=data.flight_id,
        pnr=generate_pnr()
    )

    try:
        db.add(booking)
        db.commit()
        db.refresh(booking)
    except Exception:
        db.rollback()
        return {"success": False, "error": "Booking could not be saved"}

    return {
        "success": True,
        "data": {
            "booking_id": booking.id,
            "flight_id": data.flight_id,
            "seat": data.seat_number,
            "pnr": booking.pnr
        },
        "message": "Booking successful"
    }


@app.get("/bookings/{booking_id}")
def get_booking(booking_id: int, db: Session = Depends(get_db)):
    booking = db.query(models.Booking).filter(
        models.Booking.id == booking_id
    ).first()

    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    flight = db.query(models.Flight).filter(
        models.Flight.id == booking.flight_id
    ).first()

    return {
        "success": True,
        "data": {
            "booking_id": booking.id,
            "user_id": booking.user_id,
            "flight_id": booking.flight_id,
            "pnr": booking.pnr,
            "flight": {
                "id": flight.id,
                "source": flight.source,
                "destination": flight.destination,
                "price": flight.price,
                "airline": flight.airline
            } if flight else None
        }
    }


@app.get("/flights")
def get_flights(
    source: str = None,
    destination: str = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.Flight)

    if source:
        query = query.filter(models.Flight.source == source)

    if destination:
        query = query.filter(models.Flight.destination == destination)

    flights = query.all()

    return [
        {
            "id": f.id,
            "source": f.source,
            "destination": f.destination,
            "price": f.price,
            "airline": f.airline
        }
        for f in flights
    ]
    
    
@app.get("/seats/{flight_id}")
def get_seats(flight_id: int, db: Session = Depends(get_db)):

    seats = db.query(models.Seat).filter(
        models.Seat.flight_id == flight_id
    ).order_by(models.Seat.id).all()

    return [
        {
            "id": s.id,
            "seat_number": s.seat_number,
            "is_booked": bool(s.is_booked)
        }
        for s in seats
    ]
    
@app.post("/signup")
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if existing_user:
        return {"error": "Email already exists"}

    new_user = models.User(
        name=user.name,
        email=user.email,
        password=user.password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "success": True,
        "message": "User created successfully"
    }
    
@app.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if not db_user:
        return {"error": "User not found"}

    if db_user.password != user.password:
        return {"error": "Invalid password"}

    return {
        "success": True,
        "user": {
            "id": db_user.id,
            "name": db_user.name,
            "email": db_user.email
        }
    }
    
    
@app.get("/search-flights")
def search_flights(
    from_city: str,
    to_city: str,
    db: Session = Depends(get_db)
):
    flights = db.query(models.Flight).filter(
        models.Flight.source.ilike(f"%{from_city}%"),
        models.Flight.destination.ilike(f"%{to_city}%")
    ).all()

    return flights


@app.get("/flights/{flight_id}")
def get_flight(
    flight_id: int,
    db: Session = Depends(get_db)
):
    flight = db.query(models.Flight).filter(
        models.Flight.id == flight_id
    ).first()

    return flight
