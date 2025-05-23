from fastapi import HTTPException, Request
from db import validate_session


def get_auth_user(request: Request):
    """
    Dependency for protected routes.
    Verifies that the user has a valid session. Raises 401 if not
    authenticated, 403 if session is invalid. Returns True if
    authenticated.
    """
    """verify that user has a valid session"""
    username = request.session.get("username")
    if not username and not isinstance(username, str):
        raise HTTPException(status_code=401)
    session_token = request.session.get("session_token")
    if not session_token and not isinstance(session_token, str):
        raise HTTPException(status_code=401)
    if not validate_session(username, session_token):
        raise HTTPException(status_code=403)
    return True, username
