// Role -> Permissions mapping
const ROLE_PERMISSIONS = {
  admin: ['todo:create', 'todo:read', 'todo:update', 'todo:delete'],
  editor: ['todo:create', 'todo:read', 'todo:update'],
  viewer: ['todo:read']
};

function resolvePermissionsFromRoles(roles = []) {
  const set = new Set();
  for (const role of roles) {
    const perms = ROLE_PERMISSIONS[role] || [];
    perms.forEach(p => set.add(p));
  }
  return Array.from(set);
}

module.exports = { ROLE_PERMISSIONS, resolvePermissionsFromRoles };