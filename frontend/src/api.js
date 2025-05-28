

const baseURL = "http://localhost:8000";

// ITEMS TO EXPORT:
// create_note - /api/anime/{anime_id}/notes
export async function createNote(new_note, anime_id) {
    try {
        const response = await fetch (`${baseURL}/api/anime/${anime_id}/notes`, {
            credentials:"include",
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            }, body: JSON.stringify(new_note),
        }
        );
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json()
        return data;
    } catch (e) {
        console.error(e);
        if (e instanceof Error) {
            return e;
        }
        return new Error("Unexpected Error");
    }
}
// get_all_watchlists - /api/watchlists
export async function getAllWatchlists() {
    try {
        const response = await fetch (`${baseURL}/api/watchlists`,
            {credentials: "include"}
        );
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json()
        return data;
    } catch (e) {
        console.error(e);
        if (e instanceof Error) {
            return e;
        }
        return new Error("Unexpected Error");
    }
}
// create_watchlist_entry - /api/watchlists
export async function createWatchlist(new_watchlist) {
    try {
        const response = await fetch (`${baseURL}/api/watchlists`, {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            }, body: JSON.stringify(new_watchlist),
        }
        );
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json()
        return data;
    } catch (e) {
        console.error(e);
        if (e instanceof Error) {
            return e;
        }
        return new Error("Unexpected Error");
    }
}
// get_all_anime - /api/anime
export async function getAllAnime() {
    try {
        const response = await fetch (`${baseURL}/api/anime`);
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json()
        return data;
    } catch (e) {
        console.error(e);
        if (e instanceof Error) {
            return e;
        }
        return new Error("Unexpected Error");
    }
}
// get_anime - /api/anime/{anime_id}
export async function getAnime(anime_id) {
    try {
        const response = await fetch (`${baseURL}/api/anime/${anime_id}`);
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (e) {
        console.error(e);
        if (e instanceof Error) {
            return e;
        }
        return new Error("Unexpected Error");
    }
}
// get_all_notes_by_anime - /api/anime/{anime_id}/notes
export async function getAllAnimeNotes(anime_id) {
    try {
        const response = await fetch (`${baseURL}/api/anime/${anime_id}/notes`);
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json()
        return data;
    } catch (e) {
        console.error(e);
        if (e instanceof Error) {
            return e;
        }
        return new Error("Unexpected Error");
    }
}
// delete_anime_from_watchlist - /api/watchlists/{anime_id}
export async function deleteAnimeFromWatchlist(anime_id) {
    try {
        const response = await fetch (`${baseURL}/api/watchlists/${anime_id}`, {
            credentials: "include",
            method: "DELETE"
        }

        );
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json()
        return data;
    } catch (e) {
        console.error(e);
        if (e instanceof Error) {
            return e;
        }
        return new Error("Unexpected Error");
    }
}
// delete_note - /api/anime/{anime_id}/notes/{notes_id}
export async function deleteNote(anime_id, notes_id) {
    try {
        const response = await fetch (`${baseURL}/api/anime/${anime_id}/notes/${notes_id}`, {
            credentials: "include",
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json()
        return data;
    } catch (e) {
        console.error(e);
        if (e instanceof Error) {
            return e;
        }
        return new Error("Unexpected Error");
    }
}
// delete_user - /api/users/{user_id}
export async function deleteUser(user_id) {
    try {
        const response = await fetch (`${baseURL}/api/users/${user_id}`);
        if (!response.ok) {
            throw new Error(`${response.status}`)
        }
        const data = await response.json()
        return data;
    } catch (e) {
        console.error(e);
        if (e instanceof Error) {
            return e;
        }
        return new Error("Unexpected Error");
    }
}
// validate_username_password - api/login
export async function login() {
    try {
        const response = await fetch (`${baseURL}/api/login`);
        if (!response.ok) {
            throw new Error(`${response.status}`)
        }
        const data = await response.json()
        return data;
    } catch (e) {
        console.error(e);
        if (e instanceof Error) {
            return e;
        }
        return new Error("Unexpected Error");
    }
}
// invalidate_session - /api/logout
export async function logout() {
    try {
        const response = await fetch (`${baseURL}/api/logout`);
        if (!response.ok) {
            throw new Error(`${response.status}`)
        }
        const data = await response.json()
        return data;
    } catch (e) {
        console.error(e);
        if (e instanceof Error) {
            return e;
        }
        return new Error("Unexpected Error");
    }
}
// create_user_account - /api/signup
export async function signup(new_user) {
    try {
        const response = await fetch (`${baseURL}/api/signup`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            }, body: JSON.stringify(new_user),
        }
        );
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json()
        return data;
    } catch (e) {
        console.error(e);
        if (e instanceof Error) {
            return e;
        }
        return new Error("Unexpected Error");
    }
}
// get_user_public_details - /api/me
export async function getUserDetails() {
    try {
        const response = await fetch (`${baseURL}/api/me`);
        if (!response.ok) {
            throw new Error(`${response.status}`)
        }
        const data = await response.json()
        return data;
    } catch (e) {
        console.error(e);
        if (e instanceof Error) {
            return e;
        }
        return new Error("Unexpected Error");
    }
}
// fetch_anime_results - /api/anime/search
export async function getAnimeResults() {
    try {
        const response = await fetch (`${baseURL}/api/anime/search`);
        if (!response.ok) {
            throw new Error(`${response.status}`)
        }
        const data = await response.json()
        return data;
    } catch (e) {
        console.error(e);
        if (e instanceof Error) {
            return e;
        }
        return new Error("Unexpected Error");
    }
}
