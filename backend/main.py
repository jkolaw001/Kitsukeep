from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from db import create_user, get_watchlists
from schemas import UserCreate, UserOut


app = FastAPI()

origins = ["http://127.0.0.1:5173"]

app.add_middleware(
    middleware_class=CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/users")
async def create_user(user: UserCreate) -> UserOut:
    new_user = create_user(user)
    if not new_user:
        raise HTTPException(status_code=400, detail="User already exists")
    return new_user
