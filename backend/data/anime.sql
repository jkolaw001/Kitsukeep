drop table if exists playlist;
drop table if exists watchlist;
drop table if exists notes;
drop table if exists users;
drop table if exists anime;
drop table if exists songs;

-- USER TABLE

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- ANIME TABLE
CREATE TABLE anime (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    genre VARCHAR(100),
    rating VARCHAR(10),
    img_url VARCHAR(255),
    trailer VARCHAR(255)
);

-- NOTES TABLE
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    anime_id INT NOT NULL,
    note TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (anime_id) REFERENCES anime(id) ON DELETE CASCADE
);

-- WATCHLIST TABLE
CREATE TABLE watchlist (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    anime_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (anime_id) REFERENCES anime(id) ON DELETE CASCADE
);

-- SONG TABLE
CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    song_info TEXT
);

-- PLAYLIST TABLE
CREATE TABLE playlist (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    song_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (song_id) REFERENCES songs(id) ON DELETE CASCADE
);

-- INSERT USERS
INSERT INTO users (username, email, password) VALUES
('animeFan123', 'fan123@example.com', 'securepass1'),
('otakuMaster', 'otaku@example.com', 'securepass2');

-- INSERT ANIME
INSERT INTO anime (title, description, genre, rating, img_url, trailer) VALUES
('Naruto', 'A young ninja strives to become the Hokage.', 'Action', 'PG-13', 'https://imgurl.com/naruto', 'https://trailer.com/naruto'),
('Attack on Titan', 'Humans fight for survival against Titans.', 'Thriller', 'R', 'https://imgurl.com/aot', 'https://trailer.com/aot');

-- INSERT NOTES
INSERT INTO notes (user_id, anime_id, note) VALUES
(1, 1, 'Loved the character development.'),
(2, 2, 'Epic fight scenes and deep story.');

-- INSERT WATCHLIST
INSERT INTO watchlist (user_id, anime_id) VALUES
(1, 2),
(2, 1);

-- INSERT SONG
INSERT INTO songs (song_info) VALUES
('Blue Bird - Naruto Opening'),
('Shinzou wo Sasageyo - AOT Opening');

-- INSERT PLAYLIST
INSERT INTO playlist (user_id, song_id) VALUES
(1, 1),
(2, 2);
