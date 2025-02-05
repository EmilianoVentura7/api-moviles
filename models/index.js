const sequelize = require('../config/db');
const User = require('./User');
const Task = require('./Task');

// Relaciones
User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

// Sincronizar modelos con la base de datos
sequelize.sync({ force: false }) // Cambia a `true` para eliminar y recrear las tablas
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Error syncing database:', err));

module.exports = {
    User,
    Task,
};