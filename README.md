# This is for Julio de Lima

O código abaixo esta armazenado no arquivo script.js e demonstra o uso do conceito de Thresholds, aqui defino condições que se atingidas, o teste seria considerado falho.
![Thresholds](/img/thresholds.png)

O código abaixo esta armazenado no arquivo script.js e demonstra o uso do conceito de Checks.
![Checks](/img/checks.png)

O código abaixo esta armazenado no arquivo script.js e demonstra o uso do conceito de Helpers.
![Helpers](/img/helpers.png)

O código abaixo esta armazenado no arquivo script.js e demonstra o uso do conceito de Trends.
![Trends](/img/trend.png)

O código abaixo esta armazenado no arquivo script.js e demonstra o uso do conceito de Faker.
![Faker](/img/faker.png)

O código abaixo esta armazenado no arquivo script.js e demonstra o uso do conceito de Variáveis de ambiente do k6.
![Variaveis](/img/variaveis-ambiente.png)

O código abaixo esta armazenado no arquivo script.js e demonstra o uso do conceito de Stages.
![Stages](/img/stages.png)

O código abaixo esta armazenado no arquivo script.js e demonstra o uso do conceito de Reaproveitamento de resposta.
![Reaproveitamento](/img/reaproveitamento-de-res.png)

O código abaixo esta armazenado no arquivo script.js e demonstra o uso do conceito de Token.
![Token](/img/token.png)

O código abaixo esta armazenado no arquivo script.js e demonstra o uso do conceito de DDT.
![Data-driven-testing](/img/data-driven-testing.png)

O código abaixo esta armazenado no arquivo script.js e demonstra o uso do conceito de Groups.
![Groups](/img/groups.png)

# Game of the Year API

Simple REST API built with Express to return the last 10 games. Intended for performance testing with k6.

Features
- Local JSON database (`data/db.json`)
- JWT authentication (`/auth/login`)
- Protected endpoint to get last 10 games (`/games`)
- Swagger docs at `/docs`

Getting started

1. Install dependencies

```bash
npm install
```

2. Copy and configure environment

```bash
cp .env.example .env
# edit .env to set JWT_SECRET and PORT if desired
```

3. Run

```bash
npm start
# or for development with auto reload
npm run dev
```

Default credentials (local DB)
- username: `admin`
- password: `password123`

API
- POST /auth/login
  - body: { "username": "admin", "password": "password123" }
  - response: { "token": "<JWT>" }
- GET /games
  - header: `Authorization: Bearer <JWT>`
  - response: array of up to 10 games (sorted by date desc)

Swagger
- Open `http://localhost:3000/docs` after starting the server.

k6 example

```js
import http from 'k6/http';
import { check } from 'k6';

export default function() {
  const loginRes = http.post('http://localhost:3000/auth/login', JSON.stringify({ username: 'admin', password: 'password123' }), { headers: { 'Content-Type': 'application/json' } });
  const token = loginRes.json('token');
  const res = http.get('http://localhost:3000/games', { headers: { Authorization: `Bearer ${token}` } });
  check(res, { 'status 200': r => r.status === 200 });
}
```

Project structure

- `app.js` - express app and routes
- `server.js` - starts server
- `controllers/` - route handlers
- `services/` - business logic
- `models/` - data access (local JSON DB)
- `data/db.json` - local data
- `docs/swagger.json` - OpenAPI spec
