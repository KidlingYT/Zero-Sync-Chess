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

### Helpful Resources:

- https://medium.com/@ValentinMouret/simple-authentication-with-only-postgresql-ff38f5bf8b0d
- https://dev.to/tyry327/create-a-chess-game-with-react-and-chessboardjsx-214e
- https://www.youtube.com/channel/UC_Pw1f_zuZPizv-4TwVrHyw
