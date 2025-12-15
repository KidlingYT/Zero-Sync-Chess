# Zero-Sync-Chess

# Description

An Application to play chess with zero lag... ever.
Say goodbye to lichess, chess.com, all of it.
Enjoy the best user experience of all time.
All with the help of our very good friend, Zero Sync.
Zero Sync is Rocicorp's
https://zero.rocicorp.dev/

App is **Courtesy of Symons**

# Prerequesites for running:

- Postgresql installed: https://www.postgresql.org/download/
- Node installed: https://nodejs.org/en/download
- Docker installed (required only for docker database): https://docs.docker.com/desktop/

## Trying it out:

1. Install dependencies

```bash
npm install
```

2. Create .env file (in the root)

```bash
ZERO_UPSTREAM_DB="postgresql://zero_user:incredible_zero@localhost:5432/zChess"
ZERO_REPLICA_FILE="C:/Users/yourUser/zChessTempReplica.db"
ZERO_AUTH_SECRET="someSecret"
```

3. Run the postgres database

```bash
cd postgres
docker compose up
```

4. Run the zero cache

```bash
npx zero-cache-dev
```

5. Run the app

```bash
npm run dev
```

6. All set! Open http://localhost:5173/

# Architecture

### Utilizing "The Method" by Juval Lowy.

## Architecture

### Utilizing the "Who", "What", "How", and "Where":

- Who
    - Chess Player
- What
    - Chess Community Membership
    - Chess Playing and Training
- How
    - Quick
- Where
    - Supabase DB

### Map these to layers:

- Who (Clients)
    - Player1
    - Player2
- What (Managers)
    - ManagerA
    - ManagerB
- How (Engines, Resource Access)
    - EngineA
    - EngineB
    - ResourceAccessA
    - ResourceAccessB
- Where (Data Storage)
    - Supabase DB
    - Zero Cache

### Areas of Volatility

- Client is volatile. The user could be on Mobile, Desktop, App, Web, etc.
- Matchmaking is volatile. The user could challenge another, be matched randomly, select a game, etc.
- Gameplay isn't really volatile. There are a fixed set of time controls, rules, etc. This will live in a Chess Engine.
- Notifications are volatile. There could be on-screen notifications, email notifications, phone notifications.
- Authentication is volatile. The user could be a guest, an email password user, etc.
- Rating and player profiles are volatile. The user could gain/lose rating in a number of ways.
- Resources are volatile. The user could use the indexeddb for offline play, use zero sync, use supabase, etc.
- Logging is volatile. As a developer I want to log performance, errors, and general information.

### Encapsulation of these areas

- **Client Applications** encapsulate client volatility.
- **Matchmaking Manager** encapsulates matchmaking volatility.
- **Logging Utility** encapsulates logging volatity.
- **Security Utility** encapsulates authentication volatility.
- **Player Manager** encapsulates player volatility.
- **Resource Access** encapsulates resource access volatility.
- **Chess Engine** encapsulates chess game volatility.
- **Notification Engine** encapsulates notification volatility.

### Make our Design:

- Who (Clients)
    - Player mobile
    - Player web
    - Player app
    - Player guest
- What (Managers)
    - Matchmaking Manager
    - Player Manager
- How (Engines, Resource Access)
    - Chess Engine
    - Notification Engine
    - Resource Access
- Where (Data Storage)
    - Supabase DB
    - Zero Cache (indexeddb for offline?)

### Helpful Resources:

- https://medium.com/@ValentinMouret/simple-authentication-with-only-postgresql-ff38f5bf8b0d
- https://dev.to/tyry327/create-a-chess-game-with-react-and-chessboardjsx-214e
- https://www.youtube.com/channel/UC_Pw1f_zuZPizv-4TwVrHyw
- https://dev.to/tyry327/create-a-chess-game-with-react-and-chessboardjsx-214e
- https://www.npmjs.com/package/react-chessboard
