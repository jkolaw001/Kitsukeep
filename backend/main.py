from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.responses import FileResponse
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from authenticate import get_auth_user
from db import (
    # create_user,
    get_all_watchlists,
    create_note,
    create_watchlist_entry,
    get_all_anime,
    get_anime,
    get_all_notes_by_anime,
    delete_anime_from_watchlist,
    delete_note,
    delete_user,
    validate_username_password,
    invalidate_session,
    create_user_account,
    get_user_public_details,
    fetch_anime_results,
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
    LoginCredentials,
    SuccessResponse,
    SecretResponse,
    UserPublicDetails,
    AnimeSearchResult,
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


# @app.post("/api/users")
# async def add_user(user: UserCreate) -> UserOut:
#     new_user = create_user(user)
#     if not new_user:
#         raise HTTPException(status_code=400, detail="User already exists")
#     return new_user


@app.get("/api/anime/search", response_model=list[AnimeSearchResult])
async def search_anime(query: str):
    try:
        return fetch_anime_results(query)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"{e}: No anime with that title was found. Please try again.",
        )


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


@app.post(
    "/api/anime/{anime_id}/notes",
    response_model=NoteOut,
    dependencies=[Depends(get_auth_user)],
)
async def add_note(anime_id: int, note: NoteCreate) -> NoteOut:
    new_note = create_note(note, anime_id)
    return new_note


@app.post(
    "/api/watchlists",
    response_model=WatchlistOut,
    dependencies=[Depends(get_auth_user)],
)
async def add_watchlist(watchlist: AnimeCreate, request: Request) -> WatchlistOut:
    new_watchlist = create_watchlist_entry(watchlist, request)
    if not new_watchlist:
        raise HTTPException(status_code=400, detail="Watchlist already exists")
    return new_watchlist


@app.delete(
    "/api/watchlists/{anime_id}",
    response_model=None,
    dependencies=[Depends(get_auth_user)],
)
async def remove_from_watchlist(anime_id: int, request: Request):
    anime_to_delete = delete_anime_from_watchlist(anime_id, request)
    if not anime_to_delete:
        raise HTTPException(status_code=404, detail="Anime not found in watchlist")
    return anime_to_delete


@app.delete(
    "/api/anime/{anime_id}/notes/{note_id}",
    response_model=None,
    dependencies=[Depends(get_auth_user)],
)
async def remove_note_from_anime(anime_id: int, note_id: int, request: Request):
    note_to_delete = delete_note(anime_id, note_id, request)
    if not note_to_delete:
        raise HTTPException(status_code=404, detail="Note not found")
    return note_to_delete


@app.delete(
    "/api/users/{user_id}",
    response_model=None,
    dependencies=[Depends(get_auth_user)],
)
async def remove_user(request: Request):
    user_to_delete = delete_user(request)
    if not user_to_delete:
        raise HTTPException(status_code=404, detail="User not found")
    return user_to_delete


# Endpoint to handle login requests
@app.post("/api/login", response_model=SuccessResponse)
async def session_login(
    credentials: LoginCredentials, request: Request
) -> SuccessResponse:
    """
    Handle user login.
    Validates credentials, creates a session, and stores session info
    in cookies. Returns success if login is valid, else raises 401.
    """
    # validate the username and password
    username = credentials.username
    password = credentials.password
    new_session_token = validate_username_password(username, password)

    # return a 401 (unauthorized) if invalid username/password combo
    if not new_session_token:
        raise HTTPException(status_code=401)

    # store the user's username and the generated session_token
    # in the user's session
    request.session["username"] = username
    request.session["session_token"] = new_session_token
    return SuccessResponse(success=True)


# Endpoint to handle logout requests
@app.get("/api/logout", response_model=SuccessResponse)
async def session_logout(request: Request) -> SuccessResponse:
    """
    Handle user logout.
    Invalidates the session in the database and clears session data
    from cookies. Returns success status.
    """
    # invalidate the session in the database
    username = request.session.get("username")
    if not username and not isinstance(username, str):
        return SuccessResponse(success=False)
    session_token = request.session.get("session_token")
    if not session_token and not isinstance(session_token, str):
        return SuccessResponse(success=False)
    invalidate_session(username, session_token)

    # clear out the session data
    request.session.clear()
    return SuccessResponse(success=True)


# Endpoint to handle signup requests
@app.post("/api/signup", response_model=SuccessResponse)
async def signup(credentials: LoginCredentials, request: Request) -> SuccessResponse:
    """
    Handle user signup.
    Creates a new user account if username is available, then logs in
    the user. Returns success if signup is successful, else raises 400
    or 409.
    """
    username = credentials.username
    password = credentials.password
    # Check for empty username or password
    if not username or not password:
        raise HTTPException(status_code=400, detail="Username and password required")
    # Use db.py helper to create the user account
    success = create_user_account(username, password)
    if not success:
        raise HTTPException(status_code=409, detail="Username already exists")
    # Automatically log in the user after signup
    new_session_token = validate_username_password(username, password)
    request.session["username"] = username
    request.session["session_token"] = new_session_token
    return SuccessResponse(success=True)


@app.get(
    "/api/me",
    response_model=UserPublicDetails,
    dependencies=[Depends(get_auth_user)],
)
async def get_me(request: Request) -> UserPublicDetails:
    """
    Returns the public details of the currently authenticated user.
    Raises 404 if the user is not found in the database.
    """
    username = request.session.get("username")
    if not isinstance(username, str):
        raise HTTPException(status_code=404, detail="User not found")
    user_details = get_user_public_details(username)
    if not user_details:
        raise HTTPException(status_code=404, detail="User not found")
    return user_details


# Route to handle requests for static assets
# this is a catch all so it should be registered last
@app.get("/{file_path}", response_class=FileResponse)
def get_static_file(file_path: str):
    if Path("static/" + file_path).is_file():
        return "static/" + file_path
    raise HTTPException(status_code=404, detail="Item not found")
