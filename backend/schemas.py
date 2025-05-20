from pydantic import BaseModel


class UserBase(BaseModel):
    username: str
    pasword: str
    email: str


class NoteBase(BaseModel):
    note: str
    user_id: int


class WatchlistBase(BaseModel):
    title: str
    img_url: str
    genre: str
    user_id: int
    anime_id: int


class PlaylistBase(BaseModel):
    user_id: int
    song_id: int
    anime_id: int


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
