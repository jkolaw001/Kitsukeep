from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from schemas import (
    WatchlistCreate,
    WatchlistOut,
    NoteCreate,
    NoteOut,
    UserCreate,
    UserOut,
    PlaylistCreate,
    PlaylistOut,
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
