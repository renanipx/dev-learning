const { resolvePermissionsFromRoles } = require('../auth/roles');

// Middleware to require specific permissions
function authorize(requiredPermissions = []) {
  return (req, res, next) => {
    const roles = req.user?.roles || [];
    const userPerms = resolvePermissionsFromRoles(roles);

    const hasAll = requiredPermissions.every(p => userPerms.includes(p));
    if (!hasAll) {
      return res.status(403).json({ message: 'Insufficient permissions', required: requiredPermissions });
    }
    next();
  };
}

module.exports = { authorize };