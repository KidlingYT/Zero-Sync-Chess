CREATE TABLE chess_games (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

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