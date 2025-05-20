from sqlalchemy import Column, Date, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import declarative_base, mapped_column, Mapped


Base = declarative_base()


class DBUser(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False)
    password = Column(String, nullable=False)
    email = Column(String, nullable=False)


class DBPlaylist(Base):
    __table
