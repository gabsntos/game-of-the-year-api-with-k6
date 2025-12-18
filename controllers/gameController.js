const gameService = require('../services/gameService');

async function getLastGames(req, res) {
  try {
    const games = await gameService.getLastGames(10);
    res.json(games);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'internal error' });
  }
}

async function updateGame(req, res) {
  try {
    const { id, title, year, date } = req.body || {};
    if (id === undefined || !title || year === undefined || !date) {
      return res.status(400).json({ message: 'id, title, year and date are required' });
    }

    const updated = await gameService.updateGame({ id, title, year, date });
    if (!updated) return res.status(404).json({ message: 'game not found' });
    return res.json(updated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'internal error' });
  }
}

module.exports = { getLastGames, updateGame };
