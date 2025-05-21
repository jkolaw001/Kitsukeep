from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from fastapi import HTTPException
from schemas import (
    WatchlistCreate,
    WatchlistOut,
    NoteCreate,
    NoteOut,
    UserCreate,
    UserOut,
    PlaylistCreate,
    PlaylistOut,
    AnimeCreate,
    AnimeOut,
    NoteUpdate,
)
from db_models import DBNotes, DBPlaylist, DBUser, DBWatchlist


DATABASE_URL = "postgresql+psycopg://postgres:postgres@localhost:5432/anime"

engine = create_engine(DATABASE_URL)
sessionLocal = sessionmaker(bind=engine)


def get_watchlists() -> list[WatchlistOut]:
    db = sessionLocal()
    db_watchlists = db.query(DBWatchlist).all()

    watchlists = []

    for watchlist in db_watchlists:
        watchlists.append(
            WatchlistOut(
                watchlist_id=watchlist.id,
                user_id=watchlist.user_id,
                title=watchlist.title,
                img_url=watchlist.img_url,
                genre=watchlist.genre,
                anime_id=watchlist.anime_id,
            )
        )
    db.close()
    return watchlists


def create_user(user: UserCreate) -> UserOut:
    db = sessionLocal()
    new_user = DBUser(**user.model_dump())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    result = UserOut(
        id=new_user.id,
        username=new_user.username,
        password=new_user.password,
        email=new_user.email,
    )
    db.close()
    return result


def create_watchlist(watchlist: WatchlistCreate) -> WatchlistOut:

    db = sessionLocal()
    watchlist_model = DBWatchlist(**watchlist.model_dump())

    db.add(watchlist_model)
    db.commit()
    db.refresh(watchlist_model)

    result = WatchlistOut(
        watchlist_id=watchlist_model.id,
        user_id=watchlist_model.user_id,
        title=watchlist_model.title,
        img_url=watchlist_model.img_url,
        genre=watchlist_model.genre,
        anime_id=watchlist_model.anime_id,
    )
    db.close()
    return result


def create_note(note: NoteCreate) -> NoteOut:

    db = sessionLocal()
    note_model = DBNotes(**note.model_dump())

    db.add(note_model)
    db.commit()
    db.refresh(note_model)

    result = NoteOut(
        note_id=note_model.id,
        note=note_model.note,
        user_id=note_model.user_id,
        anime_id=note_model.anime_id,
    )
    db.close()
    return result


def create_playlist(playlist: PlaylistCreate) -> PlaylistOut:
    db = sessionLocal()
    playlist_model = DBPlaylist(**playlist.model_dump())

    db.add(playlist_model)
    db.commit()
    db.refresh(playlist_model)

    result = PlaylistOut(
        playlist_id=playlist_model.id,
        user_id=playlist_model.user_id,
        song_title=playlist_model.song_title,
    )
    db.close()
    return result


def create_anime(anime: AnimeCreate) -> AnimeOut:
    db = sessionLocal()
    anime_model = DBAnime(**anime.model_dump())

    db.add(anime_model)
    db.commit()
    db.refresh(anime_model)

    result = AnimeOut(
        id=anime_model.id,
        title=anime_model.title,
        description=anime_model.description,
        genre=anime_model.genre,
        rating=anime_model.rating,
        img_url=anime_model.img_url,
    )
    db.close()
    return result


def get_anime(anime_id: int) -> AnimeOut | None:
    db = sessionLocal()
    anime = db.query(DBAnime).filter(DBAnime.id == anime_id).first()
    db.close()
    return anime


def get_user(user_id: int) -> UserOut | None:
    db = sessionLocal()
    user = db.query(DBUser).filter(DBUser.id == user_id).first()
    db.close()
    return user


def get_playlist(playlist_id: int) -> PlaylistOut | None:
    db = sessionLocal()
    playlist = db.query(DBPlaylist).filter(DBPlaylist.id == playlist_id).first()
    db.close()
    return playlist


def get_watchlist(watchlist_id: int) -> WatchlistOut | None:
    db = sessionLocal()
    watchlist = db.query(DBWatchlist).filter(DBWatchlist.id == watchlist_id).first()
    db.close()
    return watchlist


def get_note(note_id: int) -> NoteOut | None:
    db = sessionLocal()
    note = db.query(DBNotes).filter(DBNotes.id == note_id).first()
    db.close()
    return note


def get_all_anime() -> list[AnimeOut]:
    db = sessionLocal()
    anime_model = db.query(DBAnime).all
    anime_list = []
    for anime in anime_model:
        anime_list.append(anime)
    db.close()
    return anime_list


def get_all_playlists() -> list[PlaylistOut]:
    db = sessionLocal()
    playlist_model = db.query(DBPlaylist).all()
    playlist_list = []
    for playlist in playlist_model:
        playlist_list.append(playlist)
    db.close()
    return playlist_list


def get_all_watchlists() -> list[WatchlistOut]:
    db = sessionLocal()
    watchlist_model = db.query(DBWatchlist).all()
    watchlist_list = []
    for watchlist in watchlist_model:
        watchlist_list.append(watchlist)
    db.close()
    return watchlist_list


def get_all_notes() -> list[NoteOut]:
    db = sessionLocal()
    notes_model = db.query(DBNotes).all()
    notes_list = []
    for notes in notes_model:
        notes_list.append(notes)
    db.close()
    return notes_list


def get_all_users() -> list[UserOut]:
    db = sessionLocal()
    user_model = db.query(DBUser).all()
    user_list = []
    for user in user_model:
        user_list.append(user)
    db.close()
    return user_list


def delete_user(user_id: int):
    db = sessionLocal()
    user_model = db.query(DBUser).filter(DBUser.id == user_id).first()
    db.delete(user_model)
    db.commit()
    db.close()
    return {"detail": f"{user_id} has been deleted OwO"}


def delete_note(note_id: int):
    db = sessionLocal()
    note_model = db.query(DBNotes).filter(DBNotes.id == note_id).first()
    db.delete(note_model)
    db.commit()
    db.close()
    return {"detail": f"{note_id} has been deleted OwO"}


def delete_anime(anime_id: int):
    db = sessionLocal()
    anime_model = db.query(DBAnime).filter(DBAnime.id == anime_id).first()
    db.delete(anime_model)
    db.commit()
    db.close()
    return {"detail": f"{anime_id} has been deleted OwO"}


def update_note(note_id: int, notes: NoteUpdate) -> NoteOut:
    db = sessionLocal()
    note_model = db.query(DBNotes).filter(DBNotes.id == note_id).first()
    if not note_model:
        raise HTTPException(status_code=404, detail="Note not found")
    if notes.note is not None:
        note_model.note = notes.note
    db.commit()
    db.refresh(note_model)
    db.close()
    return note_model
