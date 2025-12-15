CREATE TABLE chess_games (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    white_player_name TEXT NOT NULL,
    black_player_name TEXT NOT NULL,

    fen TEXT NOT NULL,
    is_active BOOLEAN NOT NULL,

    white_time INTEGER NOT NULL, -- seconds
    black_time INTEGER NOT NULL  -- seconds
);

CREATE TABLE users (
    name TEXT NOT NULL,
    email TEXT PRIMARY KEY,
    password TEXT NOT NULL
);