from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from db import (
    create_user,
    get_all_watchlists,
    create_note,
    create_watchlist,
    get_all_anime,
    get_anime,
    get_all_notes_by_anime,
    delete_anime_from_watchlist,
    delete_note,
    delete_user,
)
from schemas import (
    UserCreate,
    UserOut,
    WatchlistOut,
    NoteCreate,
    NoteOut,
    AnimeCreate,
    AnimeOut,
    WatchlistCreate,
    NoteWithUserOut,
    NoteWithAnimeOut,
    WatchlistWithAnimeOut,
)


app = FastAPI()

app.add_middleware(
    SessionMiddleware,
    secret_key="some-random-string",
    session_cookie="session",
    max_age=60 * 60 * 2,  # 2 hours in seconds
)

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


@app.get("/api/anime")
async def get_every_anime() -> list[AnimeOut]:
    return get_all_anime()


@app.get("/api/anime/{anime_id}")
async def get_anime_by_id(anime_id: int) -> AnimeOut | None:
    anime = get_anime(anime_id)
    if not anime:
        raise HTTPException(status_code=404, detail="Anime not found")
    return anime


@app.get("/api/watchlists")
async def get_watchlist() -> list[WatchlistWithAnimeOut] | None:
    watchlists = get_all_watchlists()
    if not watchlists:
        raise HTTPException(status_code=404, detail="Watchlist not found")
    return watchlists


@app.get("/api/anime/{anime_id}/notes")
async def get_notes_by_anime_id(anime_id: int) -> list[NoteWithAnimeOut] | None:
    notes = get_all_notes_by_anime(anime_id)
    return notes


@app.post("/api/anime/{anime_id}/notes")
async def add_note(anime_id: int, note: NoteCreate) -> NoteOut:
    new_note = create_note(note, anime_id)
    return new_note


@app.post("/api/watchlists")
async def add_watchlist(watchlist: WatchlistCreate) -> WatchlistOut:
    new_watchlist = create_watchlist(watchlist)
    if not new_watchlist:
        raise HTTPException(status_code=400, detail="Watchlist already exists")
    return new_watchlist


@app.delete("/api/watchlists/{anime_id}")
async def remove_from_watchlist(anime_id: int, user_id: int):
    anime_to_delete = delete_anime_from_watchlist(anime_id, user_id)
    if not anime_to_delete:
        raise HTTPException(status_code=404, detail="Anime not found in watchlist")
    return anime_to_delete


@app.delete("/api/anime/{anime_id}/notes/{note_id}")
async def remove_note_from_anime(anime_id: int, note_id: int):
    note_to_delete = delete_note(anime_id, note_id)
    if not note_to_delete:
        raise HTTPException(status_code=404, detail="Note not found")
    return note_to_delete


@app.delete("/api/users/{user_id}")
async def remove_user(user_id: int):
    user_to_delete = delete_user(user_id)
    if not user_to_delete:
        raise HTTPException(status_code=404, detail="User not found")
    return user_to_delete


# Route to handle requests for static assets
# this is a catch all so it should be registered last
@app.get("/{file_path}", response_class=FileResponse)
def get_static_file(file_path: str):
    if Path("static/" + file_path).is_file():
        return "static/" + file_path
    raise HTTPException(status_code=404, detail="Item not found")
