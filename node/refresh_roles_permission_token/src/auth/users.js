// In-memory users with roles
const USERS = [
  { id: 'u1', username: 'admin', password: 'admin123', roles: ['admin'] },
  { id: 'u2', username: 'editor', password: 'editor123', roles: ['editor'] },
  { id: 'u3', username: 'viewer', password: 'viewer123', roles: ['viewer'] }
];

function findUser(username) {
  return USERS.find(u => u.username === username);
}

function findUserById(id) {
  return USERS.find(u => u.id === id);
}

module.exports = { USERS, findUser, findUserById };