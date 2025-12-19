# This is for Julio de Lima

O código abaixo está armazenado no arquivo `script.js` e demonstra o uso do conceito de Thresholds. Aqui são definidas condições que, se atingidas, o teste é considerado falho. O critério de aceitação para o teste é que os percentis 90 e 95 estejam abaixo de 30 ms, e que o percentual de requisições com falha seja zero.
![Thresholds](/img/thresholds.png)

O código abaixo está armazenado no arquivo `script.js` e demonstra o uso do conceito de Checks. O método `check` pode ser usado para validar o código de status, o corpo da resposta e o tempo de resposta. No exemplo abaixo é realizada uma asserção no código de status da resposta, que se espera que seja 200.
![Checks](/img/checks.png)

O código abaixo está armazenado no arquivo `login.js` e demonstra o uso do conceito de Helpers. O arquivo `loginHeaders.json`, que contém os cabeçalhos necessários para realizar a requisição de login, é aberto através do método `JSON.parse(open())`, armazenado na variável "headers" e passado na requisição de login.
![Helpers](/img/helpers.png)

O código abaixo está armazenado no arquivo `script.js` e demonstra o uso do conceito de Trends. Uma métrica customizada que pode ser adicionada através da criação da instância da classe `Trend` e do método `add` contendo a métrica desejada.
![Trends](/img/trend.png)

O código abaixo está armazenado no arquivo `script.js` e demonstra o uso do Faker, biblioteca para criação de dados aleatórios não reais. No exemplo, é criado um nome fictício que é usado como título na segunda requisição.
![Faker](/img/faker.png)

O código abaixo está armazenado no arquivo `script.js` e demonstra o uso do conceito de variáveis de ambiente do k6, aqui definida como `__ENV.LOCAL`. Podemos assim passar seu valor pela linha de comando: `k6 run -e LOCAL=http://localhost:3000 .\tests\k6\script.js`
![Variáveis](/img/variaveis-ambiente.png)

O código abaixo está armazenado no arquivo `script.js` e demonstra o uso do conceito de Stages. Uma forma de exercer controle sobre a quantidade de usuários virtuais ao longo do tempo. Desta forma, podemos realizar aumentos e reduções (ramp-up/ramp-down) ou manter a carga ao longo de um certo período de tempo.
![Stages](/img/stages.png)

O código abaixo está armazenado no arquivo `script.js` e demonstra o uso do conceito de reaproveitamento de resposta. O arquivo `login.js` contém a função que retorna a resposta do login, que será utilizada no arquivo `script.js` para recuperar o token de autenticação, necessário para realizar as demais requisições.
![Reaproveitamento](/img/reaproveitamento-de-res.png)

O código abaixo está armazenado no arquivo `script.js` e demonstra o uso do conceito de Token, um conjunto de caracteres que serve como forma de identificação, recuperado da requisição de login e passado no cabeçalho das demais requisições.
![Token](/img/token.png)

O código abaixo está armazenado no arquivo `login.js` e demonstra o uso do conceito de DDT. O arquivo `credentials.json` contém os usuários previamente cadastrados. Através de um SharedArray e da linha de código ```const userCredentials = users[__VU % users.length]``` defino que cada usuário virtual fará o login com credenciais diferentes.
![Data-driven-testing](/img/data-driven-testing.png)

O código abaixo está armazenado no arquivo `script.js` e demonstra o uso do conceito de Groups. Uma forma de organizar as requisições em grupos, aumentando assim a organização geral do código.
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
