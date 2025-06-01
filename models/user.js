const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../db")

const Users = sequelize.define('user', {

    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    userName: {
        type: DataTypes.STRING,
    },

    email: {
        type: DataTypes.STRING,
        unique: true,

    },
    password: {
        type: DataTypes.STRING,
    },

    userType: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'admin',
        validate: {
            isIn: [['admin', 'candidate', 'client']]
        }
    },

    jobTarget: {
        type: DataTypes.INTEGER,
        defaultValue: 0,

    },

    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: "true",
        allowNull: false
    },


});

// sequelize.getQueryInterface().addColumn('users', 'jobTarget', {
//     type: DataTypes.INTEGER,
//     defaultValue: 0,

// }); 



module.exports = Users;
