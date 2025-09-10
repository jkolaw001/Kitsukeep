from schemas import AnimeOut, AnimeCreate
from db_models import DBAnime, Base
import requests
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql+psycopg://postgres:Lu296176@anime.cluster-cglem2qoq2lm.us-east-1.rds.amazonaws.com:5432/anime"
engine = create_engine(DATABASE_URL)
sessionLocal = sessionmaker(bind=engine)

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)


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
            mal_id=anime["mal_id"],
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
            mal_id=anime_model.mal_id,
        )
        added_anime.append(new_anime)
    return added_anime


fetch_top_anime()
