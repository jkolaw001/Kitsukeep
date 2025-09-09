from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class UserBase(BaseModel):
    username: str
    password: str
    session_token: str
    session_expired_at: datetime


class AnimeSearchResult(BaseModel):
    mal_id: int
    img_url: Optional[str]
    title: str
    description: Optional[str]
    genre: Optional[str]
    rating: Optional[str]
    trailer: Optional[str]


class AnimeBase(BaseModel):
    title: str
    description: Optional[str]
    genre: Optional[str]
    rating: Optional[str]
    img_url: Optional[str]
    trailer: Optional[str]
    mal_id: int


class NoteBase(BaseModel):
    note: str


class WatchlistBase(BaseModel):
    user_id: int
    anime_id: int


class PlaylistBase(BaseModel):
    user_id: int
    song_id: int


class UserCreate(UserBase):
    password: str


class UserOut(UserBase):
    id: int


class PlaylistCreate(PlaylistBase):
    pass


class PlaylistOut(PlaylistBase):
    playlist_id: int


class WatchlistOut(WatchlistBase):
    watchlist_id: int


class WatchlistCreate(WatchlistBase):
    pass


class NoteCreate(NoteBase):
    pass


class NoteOut(NoteBase):
    note_id: int
    anime_id: int


class NoteWithUserOut(BaseModel):
    id: int
    user_id: int
    note: str
    anime_id: int
    username: str


class AnimeCreate(AnimeBase):
    pass


class AnimeOut(AnimeBase):
    id: int


class NoteUpdate(BaseModel):
    note: Optional[str] = None


class WatchlistWithAnimeOut(BaseModel):
    watchlist_id: int
    user_id: int
    anime_id: int
    title: str
    img_url: str
    genre: str


class NoteWithAnimeOut(BaseModel):
    id: int
    user_id: int
    note: str
    anime_id: int
    username: str


class LoginCredentials(BaseModel):
    username: str
    password: str


class SuccessResponse(BaseModel):
    success: bool


class SecretResponse(BaseModel):
    secret: str


class UserPublicDetails(BaseModel):
    username: str
    # Add more public fields here if needed
