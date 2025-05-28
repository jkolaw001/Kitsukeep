from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi import HTTPException, Request
from datetime import datetime, timedelta
from secrets import token_urlsafe
import bcrypt
import requests

# from authenticate import get_auth_user
from schemas import (
    WatchlistOut,
    NoteCreate,
    NoteOut,
    UserOut,
    PlaylistCreate,
    PlaylistOut,
    AnimeCreate,
    AnimeOut,
    NoteUpdate,
    NoteWithUserOut,
    WatchlistWithAnimeOut,
    NoteWithAnimeOut,
    AnimeSearchResult,
)
from db_models import DBNotes, DBPlaylist, DBUser, DBWatchlist, DBAnime


DATABASE_URL = "postgresql+psycopg://postgres:postgres@localhost:5432/anime"
SESSION_LIFE_MINUTES = 60 * 60 * 2

engine = create_engine(DATABASE_URL)
sessionLocal = sessionmaker(bind=engine)


def get_all_watchlists(request: Request) -> list[WatchlistOut]:
    db = sessionLocal()

    username = request.session.get("username")
    user_id = db.query(DBUser.id).filter(DBUser.username == username).scalar()
    if user_id is None:
        raise HTTPException(status_code=404, detail="User not found")

    watchlists = (
        db.query(DBWatchlist, DBAnime)
        .filter(DBWatchlist.user_id == user_id)
        .join(DBAnime, DBWatchlist.anime_id == DBAnime.id)
        .all()
    )

    result = []

    for watchlist, anime in watchlists:
        result.append(
            WatchlistWithAnimeOut(
                watchlist_id=watchlist.id,
                user_id=watchlist.user_id,
                anime_id=watchlist.anime_id,
                title=anime.title,
                img_url=anime.img_url,
                genre=anime.genre,
            )
        )

    db.close()
    return result


# def create_user(user: UserCreate) -> UserOut:
#     db = sessionLocal()
#     new_user = DBUser(**user.model_dump())
#     db.add(new_user)
#     db.commit()
#     db.refresh(new_user)

#     result = UserOut(
#         id=new_user.id,
#         username=new_user.username,
#         password=new_user.password,
#     )
#     db.close()
#     return result


def create_watchlist_entry(anime: AnimeCreate, request: Request) -> WatchlistOut:

    db = sessionLocal()
    username = request.session.get("username")
    user_id = db.query(DBUser.id).filter(DBUser.username == username).scalar()
    if user_id is None:
        raise HTTPException(status_code=404, detail="User not found")
    check = db.query(DBAnime).where(DBAnime.mal_id == anime.mal_id).first()
    if not check:
        new_anime = DBAnime(**anime.model_dump())
        db.add(new_anime)
        db.commit()
        db.refresh(new_anime)
        add_to_watchlist = DBWatchlist(anime_id=new_anime.id, user_id=user_id)
        db.add(add_to_watchlist)
        db.commit()
        db.refresh(add_to_watchlist)
        result = WatchlistOut(
            watchlist_id=add_to_watchlist.id,
            user_id=add_to_watchlist.user_id,
            anime_id=add_to_watchlist.anime_id,
        )

        db.close()
        return result

    add_to_watchlist = DBWatchlist(anime_id=check.id, user_id=user_id)
    db.add(add_to_watchlist)
    db.commit()
    db.refresh(add_to_watchlist)

    result = WatchlistOut(
        watchlist_id=add_to_watchlist.id,
        user_id=add_to_watchlist.user_id,
        anime_id=add_to_watchlist.anime_id,
    )

    db.close()
    return result


def create_note(
    note: NoteCreate,
    anime_id: int,
) -> NoteOut:

    db = sessionLocal()
    note_model = DBNotes(user_id=note.user_id, anime_id=anime_id, note=note.note)

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
        song_id=playlist_model.song_id,
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
        trailer=anime_model.trailer,
        mal_id=anime_model.mal_id,
    )
    db.close()
    return result


def get_anime(anime_id: int) -> AnimeOut | None:
    db = sessionLocal()
    anime = db.query(DBAnime).filter(DBAnime.id == anime_id).first()
    if not anime:
        return None
    chosen_anime = AnimeOut(
        id=anime.id,
        title=anime.title,
        description=anime.description,
        genre=anime.genre,
        rating=anime.rating,
        img_url=anime.img_url,
        trailer=anime.trailer,
        mal_id=anime.mal_id,
    )
    db.close()
    return chosen_anime


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

    db_animes = db.query(DBAnime).order_by(DBAnime.id).all()
    animes = []
    for db_anime in db_animes:
        animes.append(
            AnimeOut(
                id=db_anime.id,
                title=db_anime.title,
                description=db_anime.description,
                genre=db_anime.genre,
                rating=db_anime.rating,
                img_url=db_anime.img_url,
                trailer=db_anime.trailer,
                mal_id=db_anime.mal_id,
            )
        )
    db.close()
    return animes


def get_all_playlists() -> list[PlaylistOut]:
    db = sessionLocal()
    playlist_model = db.query(DBPlaylist).all()
    playlist_list = []
    for playlist in playlist_model:
        playlist_list.append(
            PlaylistOut(
                playlist_id=playlist.id,
                song_id=playlist.song_id,
                user_id=playlist.user_id,
            )
        )
    db.close()
    return playlist_list


def get_all_notes_with_users() -> list[NoteWithUserOut]:
    db = sessionLocal()

    results = (
        db.query(DBNotes, DBUser.username)
        .join(DBUser, DBNotes.user_id == DBUser.id)
        .all()
    )

    notes_with_users = []
    for note, username in results:
        notes_with_users.append(
            NoteWithUserOut(
                id=note.id,
                user_id=note.user_id,
                note=note.note,
                anime_id=note.anime_id,
                username=username,
            )
        )
    db.close()
    return notes_with_users


def get_all_notes_by_anime(anime_id: int) -> list[NoteWithAnimeOut]:
    db = sessionLocal()

    results = (
        db.query(DBNotes, DBUser.username)
        .join(DBUser, DBNotes.user_id == DBUser.id)
        .filter(DBNotes.anime_id == anime_id)
        .all()
    )

    notes_with_users = []
    for note, username in results:
        notes_with_users.append(
            NoteWithAnimeOut(
                id=note.id,
                user_id=note.user_id,
                note=note.note,
                anime_id=note.anime_id,
                username=username,
            )
        )
    db.close()
    return notes_with_users


def get_all_users() -> list[UserOut]:
    db = sessionLocal()
    user_model = db.query(DBUser).all()
    user_list = []
    for user in user_model:
        user_list.append(user)
    db.close()
    return user_list


def delete_user(request: Request):
    db = sessionLocal()
    username = request.session.get("username")
    user_id = db.query(DBUser.id).filter(DBUser.username == username).scalar()
    if user_id is None:
        raise HTTPException(status_code=404, detail="User not found")
    user_model = db.query(DBUser).filter(DBUser.id == user_id).first()
    db.delete(user_model)
    db.commit()
    db.close()
    return {"detail": f"{user_id} has been deleted OwO"}


def delete_note(anime_id: int, note_id: int, request: Request):
    db = sessionLocal()
    username = request.session.get("username")
    user_id = db.query(DBUser.id).filter(DBUser.username == username).scalar()
    if user_id is None:
        raise HTTPException(status_code=404, detail="User not found")
    note_model = (
        db.query(DBNotes)
        .filter(DBNotes.id == note_id, DBNotes.anime_id == anime_id)
        .first()
    )
    db.delete(note_model)
    db.commit()
    db.close()
    return {"detail": f"{note_id} has been deleted OwO"}


def delete_anime_from_watchlist(anime_id: int, request: Request):
    db = sessionLocal()
    username = request.session.get("username")
    user_id = db.query(DBUser.id).filter(DBUser.username == username).scalar()
    if user_id is None:
        raise HTTPException(status_code=404, detail="User not found")
    anime_model = (
        db.query(DBWatchlist)
        .filter(DBWatchlist.anime_id == anime_id, DBWatchlist.user_id == user_id)
        .first()
    )
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


def validate_username_password(username: str, password: str) -> str | None:
    """
    Validate a username and password against the database. If valid,
    generates a new session token, updates the session expiration, and
    returns the session token. Returns None if credentials are invalid.
    """
    # retrieve the user account from the database
    with sessionLocal() as db:
        account = db.query(DBUser).filter(DBUser.username == username).first()
        if not account:
            return None

        # validate the provided credentials (username & password)
        valid_credentials = bcrypt.checkpw(password.encode(), account.password.encode())
        if not valid_credentials:
            return None

        # create a new session token and set the expiration date
        session_token = token_urlsafe()
        account.session_token = session_token
        expires = datetime.now() + timedelta(minutes=SESSION_LIFE_MINUTES)
        # assign as datetime, not isoformat
        account.session_expires_at = expires
        db.commit()
        return session_token


def invalidate_session(username: str, session_token: str) -> None:
    """
    Invalidate a user's session by setting the session token to a unique
    expired value.
    """
    # retrieve the user account for the given session token
    with sessionLocal() as db:
        account = (
            db.query(DBUser)
            .filter(
                DBUser.username == username,
                DBUser.session_token == session_token,
            )
            .first()
        )
        if not account:
            return

        # set the token to an invalid value that is unique
        account.session_token = f"expired-{token_urlsafe()}"
        db.commit()


def create_user_account(username: str, password: str) -> bool:
    """
    Create a new user account with the given username and password.
    Returns True if the account was created successfully, or False if the
    username exists.
    """
    # Create a new user account.
    # Returns True if successful, False if username exists.
    with sessionLocal() as db:
        # Check if username already exists
        if db.query(DBUser).filter(DBUser.username == username).first():
            return False
        # Hash the password using bcrypt before storing it in the database.
        # bcrypt.hashpw returns a hashed password as bytes,
        # which we decode to a string.
        hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
        account = DBUser(
            username=username,
            password=hashed_password,
            session_token=None,
            session_expires_at=None,
        )
        db.add(account)
        db.commit()
        return True


def validate_session(username: str, session_token: str) -> bool:
    """
    Validate a session token for a given username. Returns True if the
    session is valid and not expired, and updates the session expiration.
    Returns False otherwise.
    """
    # retrieve the user account for the given session token
    with sessionLocal() as db:
        account = (
            db.query(DBUser)
            .filter(
                DBUser.username == username,
                DBUser.session_token == session_token,
            )
            .first()
        )
        if not account:
            return False

        # validate that it is not expired
        if datetime.now() >= account.session_expires_at:
            return False

        # update the expiration date and save to the database
        expires = datetime.now() + timedelta(minutes=SESSION_LIFE_MINUTES)
        # assign as datetime, not isoformat
        account.session_expires_at = expires
        db.commit()
        return True


# This is an authentication function which can be Depend'd
# on by a route to require authentication for access to the route.
# See the next route below (@app.get("/", ...)) for an example.
# def get_auth_user(request: Request):
#     """
#     Dependency for protected routes.
#     Verifies that the user has a valid session. Raises 401 if not
#     authenticated, 403 if session is invalid. Returns True if
#     authenticated.
#     """
#     """verify that user has a valid session"""
#     username = request.session.get("username")
#     if not username and not isinstance(username, str):
#         raise HTTPException(status_code=401)
#     session_token = request.session.get("session_token")
#     if not session_token and not isinstance(session_token, str):
#         raise HTTPException(status_code=401)
#     if not validate_session(username, session_token):
#         raise HTTPException(status_code=403)
#     return True


def get_user_public_details(username: str):
    """
    Fetch public details for a user by username. Returns a UserPublicDetails
    object if found, or None if not found.
    """
    from schemas import UserPublicDetails

    with sessionLocal() as db:
        account = db.query(DBUser).filter(DBUser.username == username).first()
        if not account:
            return None
        return UserPublicDetails(username=account.username)


def fetch_anime_results(query: str) -> list[AnimeSearchResult]:
    external_url = f"https://api.jikan.moe/v4/anime?q={query}&limit=10"
    response = requests.get(external_url)

    if not response.ok:
        raise Exception("External API error")

    data = response.json().get("data", [])
    results = [
        AnimeSearchResult(
            mal_id=item["mal_id"],
            image_url=item["images"]["jpg"]["image_url"],
            title=item["title"],
            description=item["synopsis"],
            genre=item["genres"][0]["name"],
            rating=item["rating"],
            trailer=item["trailer"]["url"],
        )
        for item in data
    ]
    return results
