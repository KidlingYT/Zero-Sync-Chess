CREATE TABLE chess_games (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    white_player_name TEXT NOT NULL,
    black_player_name TEXT NOT NULL,
    fen TEXT NOT NULL,
    is_active BOOLEAN NOT NULL
);

CREATE TABLE users (
    name TEXT NOT NULL,
    email TEXT PRIMARY KEY,
    password TEXT NOT NULL
);
