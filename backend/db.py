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


DATABASE_URL = "postgresql+psycopg://postgres:postgres@localhost:5432/anime"

engine = create_engine(DATABASE_URL)
sessionLocal = sessionmaker(bind=engine)


def get_watchlists() -> list[WatchlistOut]:
    db = sessionLocal()
    db_watchlists = db.query(DBWatchlist).all()


    watchlists = []

    for db_watchlist in db_watchlists:
        watchlists.append(
            WatchlistOut(
                watchlist_id=db_watchlist.watchlist_id,
                title=db_watchlist.title,
                img_url=db_watchlist.img_url,
                genre=db_watchlist.genre,
                user_id=db_watchlist.user_id
            )
        )
    db.close()
    return watchlists




def create_user(user: UserCreate) -> UserOut
    db = sessionLocal()
    new_user = DBUser(**model_dump)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    user = UserOut(
    id = new_user.id
    username = new_user.username
    password = new_user.password
    email = new_user.email)
    return user`
