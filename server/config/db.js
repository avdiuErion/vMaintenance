const { Sequelize } = require('sequelize');

const connString = process.env.CONNECTION_STRING;

const sequelize = new Sequelize(connString, {
    dialect: 'postgres',
    logging: false
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync();
        console.log('Database synchronized');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
}

module.exports = { connectDB, sequelize };