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
