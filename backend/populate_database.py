from schemas import AnimeOut, AnimeCreate
from db_models import DBAnime
import requests
from db import sessionLocal


def fetch_top_anime() -> list[AnimeOut]:
    external_url = f"https://api.jikan.moe/v4/top/anime"
    response = requests.get(external_url)

    if not response.ok:
        raise Exception("External API error")

    data = response.json().get("data", [])

    results = [
        AnimeCreate(
            title=anime["title"],
            description=anime["synopsis"],
            genre=anime["genres"][0]["name"],
            rating=anime["rating"],
            img_url=anime["images"]["jpg"]["image_url"],
            trailer=anime["trailer"]["url"],
        )
        for anime in data
    ]
    db = sessionLocal()
    added_anime = []
    for anime in results:
        anime_model = DBAnime(**anime.model_dump())
        db.add(anime_model)
        db.commit()
        db.refresh(anime_model)
        new_anime = AnimeOut(
            id=anime_model.id,
            title=anime_model.title,
            description=anime_model.description,
            genre=anime_model.genre,
            rating=anime_model.rating,
            img_url=anime_model.img_url,
            trailer=anime_model.trailer,
        )
        added_anime.append(new_anime)
    return added_anime
