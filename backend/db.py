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
                anime_id=watchlist.anime_id
            )
        )
    db.close()
    return watchlists




def create_user(user: UserCreate) -> UserOut
    db = sessionLocal()
    new_user = DBUser(**model_dump())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    user = UserOut(
    id = new_user.id
    username = new_user.username
    password = new_user.password
    email = new_user.email)
    return user`
