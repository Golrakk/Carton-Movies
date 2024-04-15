CREATE TABLE IF NOT EXISTS "movies" (
    genre_ids INTEGER[],
    id INTEGER PRIMARY KEY,
    original_language VARCHAR,
    original_title VARCHAR,
    overview TEXT,
    release_date DATE,
    title VARCHAR,
    vote_average NUMERIC
);