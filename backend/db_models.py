from sqlalchemy import ForeignKey
from sqlalchemy.orm import declarative_base, mapped_column, Mapped
from datetime import datetime


Base = declarative_base()


class DBUser(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    username: Mapped[str] = mapped_column(nullable=False, unique=True)
    password: Mapped[str] = mapped_column(nullable=False)
    session_token: Mapped[str] = mapped_column()
    session_expires_at: Mapped[datetime] = mapped_column()


class DBPlaylist(Base):
    __tablename__ = "playlist"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    song_id: Mapped[int] = mapped_column(nullable=False)


class DBWatchlist(Base):
    __tablename__ = "watchlist"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    anime_id: Mapped[int] = mapped_column(ForeignKey("anime.id"), nullable=False)


class DBNotes(Base):
    __tablename__ = "notes"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    note: Mapped[str] = mapped_column(nullable=False)
    anime_id: Mapped[int] = mapped_column(ForeignKey("anime.id"), nullable=False)


class DBAnime(Base):
    __tablename__ = "anime"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[str] = mapped_column(nullable=False)
    genre: Mapped[str] = mapped_column(nullable=False)
    rating: Mapped[str] = mapped_column(nullable=False)
    img_url: Mapped[str] = mapped_column(nullable=True)
    trailer: Mapped[str] = mapped_column(nullable=True)


class DBSong(Base):
    __tablename__ = "songs"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    song_info: Mapped[str] = mapped_column(nullable=False)
