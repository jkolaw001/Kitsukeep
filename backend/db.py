from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


DATABASE_URL = "postgresql+psycopg://postgres:postgres@localhost:5432/anime"

engine = create_engine(DATABASE_URL)
sessionLocal = sessionmaker(bind=engine)
