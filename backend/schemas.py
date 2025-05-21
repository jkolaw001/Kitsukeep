from pydantic import BaseModel


class UserBase(BaseModel):
    username: str
    password: str
    email: str


class AnimeBase(BaseModel):
    title: str
    description: str
    genre: str
    rating: str
    img_url: str


class NoteBase(BaseModel):
    note: str
    user_id: int
    anime_id: int


class WatchlistBase(BaseModel):
    title: str
    img_url: str
    genre: str
    user_id: int
    anime_id: int


class PlaylistBase(BaseModel):
    user_id: int
    song_title: str


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


class AnimeCreate(AnimeBase):
    pass


class AnimeOut(AnimeBase):
    id: int
