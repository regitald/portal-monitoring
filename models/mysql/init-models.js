var DataTypes = require("sequelize").DataTypes;
var _menu = require("./menu");
var _permission_role = require("./permission_role");
var _permissions = require("./permissions");
var _roles = require("./roles");
var _user_activities = require("./user_activities");
var _users = require("./users");

function initModels(sequelize) {
  var menu = _menu(sequelize, DataTypes);
  var permission_role = _permission_role(sequelize, DataTypes);
  var permissions = _permissions(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var user_activities = _user_activities(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  permissions.belongsTo(menu, { as: "menu", foreignKey: "menu_id"});
  menu.hasMany(permissions, { as: "permissions", foreignKey: "menu_id"});
  permission_role.belongsTo(permissions, { as: "permission", foreignKey: "permission_id"});
  permissions.hasMany(permission_role, { as: "permission_roles", foreignKey: "permission_id"});
  permission_role.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  permissions.belongsToMany(roles, {through: "permission_role",foreignKey:"permission_id"});
  roles.belongsToMany(permissions, {through: "permission_role",foreignKey:"role_id"});
  roles.hasMany(permission_role, { as: "permission_roles", foreignKey: "role_id"});
  users.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(users, { as: "users", foreignKey: "role_id"});
  user_activities.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_activities, { as: "user_activities", foreignKey: "user_id"});

  return {
    menu,
    permission_role,
    permissions,
    roles,
    user_activities,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
