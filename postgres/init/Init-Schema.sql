Create Table chess_games {
    id INT IDENTITY(1,1) PRIMARY KEY
    whitePlayerName NVARCHAR NOT NULL
    blackPlayerName NVARCHAR NOT NULL
    fen NVARCHAR NOT NULL
    is_active BOOLEAN NOT NULL
}

CREATE TABLE z_chess_user {
    id INT IDENTITY(1,1) PRIMARY KEY
    name NVARCHAR NOT NULL
}

CREATE TABLE users {
    name NVARCHAR NOT NULL
    email NVARCHAR PRIMARY KEY
    password NVARCHAR NOT NULL
}

create function authenticate_user(email text, pass text)
  returns boolean
  language sql
  immutable
  returns null on null input
  return (select true
            from users
           where email = email
             and password = crypt(pass, password));
