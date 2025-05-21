from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from db import create_user, get_watchlists, create_watchlist
from schemas import UserCreate, UserOut, WatchlistOut, AnimeCreate, AnimeOut, WatchlistCreate


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
async def add_user(user: UserCreate) -> UserOut:
    new_user = create_user(user)
    if not new_user:
        raise HTTPException(status_code=400, detail="User already exists")
    return new_user


@app.get("/api/watchlists")
async def get_watchlist() -> list[WatchlistOut]:
    return get_watchlists()

@app.post("/api/watchlists")
async def add_watchlist(watchlist: WatchlistCreate) -> WatchlistOut:
    new_watchlist = create_watchlist(watchlist)
    if not new_watchlist:
        raise HTTPException(status_code=400, detail="Watchlist already exists")
    return new_watchlist

@app.delete("/api/watchlists/{anime_id}")
async def remove_from_watchlist(anime_id: int):



