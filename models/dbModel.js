const fs = require('fs').promises;
const path = require('path');

const DB_PATH = path.resolve(__dirname, '../data/db.json');

async function readDb() {
  const raw = await fs.readFile(DB_PATH, 'utf8');
  return JSON.parse(raw);
}

async function getUserByUsername(username) {
  const db = await readDb();
  return db.users.find(u => u.username === username) || null;
}

async function getLastGames(limit = 10) {
  const db = await readDb();
  const games = Array.isArray(db.games) ? db.games : [];
  // sort by date descending
  const sorted = games.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  return sorted.slice(0, limit);
}

async function writeDb(db) {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
}

async function updateGame(updated) {
  const db = await readDb();
  if (!Array.isArray(db.games)) db.games = [];
  const idx = db.games.findIndex(g => Number(g.id) === Number(updated.id));
  if (idx === -1) return null;
  const existing = db.games[idx];
  const merged = Object.assign({}, existing, {
    id: Number(updated.id),
    title: updated.title,
    year: Number(updated.year),
    date: updated.date
  });
  db.games[idx] = merged;
  await writeDb(db);
  return merged;
}

module.exports = { getUserByUsername, getLastGames, updateGame };
