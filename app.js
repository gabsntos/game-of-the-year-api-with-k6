const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

dotenv.config();

const authController = require('./controllers/authController');
const gameController = require('./controllers/gameController');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

app.use(express.json());

// Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.post('/auth/login', authController.login);
app.get('/games', authMiddleware.verifyToken, gameController.getLastGames);
app.put('/games', authMiddleware.verifyToken, gameController.updateGame);

// health
app.get('/health', (req, res) => res.json({ status: 'ok' }));

module.exports = app;
