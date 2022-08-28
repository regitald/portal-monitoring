var DataTypes = require("sequelize").DataTypes;
var _permission_role = require("./permission_role");
var _permissions = require("./permissions");
var _role_user = require("./role_user");
var _roles = require("./roles");
var _users = require("./users");

function initModels(sequelize) {
  var permission_role = _permission_role(sequelize, DataTypes);
  var permissions = _permissions(sequelize, DataTypes);
  var role_user = _role_user(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  permission_role.belongsTo(permissions, { as: "role", foreignKey: "role_id"});
  permissions.hasMany(permission_role, { as: "permission_roles", foreignKey: "role_id"});
  permission_role.belongsTo(roles, { as: "permission", foreignKey: "permission_id"});
  roles.hasMany(permission_role, { as: "permission_roles", foreignKey: "permission_id"});
  role_user.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(role_user, { as: "role_users", foreignKey: "role_id"});
  role_user.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(role_user, { as: "role_users", foreignKey: "user_id"});

  return {
    permission_role,
    permissions,
    role_user,
    roles,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
