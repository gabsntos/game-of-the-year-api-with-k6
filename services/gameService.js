const db = require('../models/dbModel');

async function getLastGames(limit = 10) {
  const games = await db.getLastGames(limit);
  return games;
}

async function updateGame(data) {
  const updated = await db.updateGame(data);
  return updated;
}

module.exports = { getLastGames, updateGame };
