import { Sequelize } from "sequelize";
import db from "../config/database.js";


const { DataTypes } = Sequelize

const User = db.define('users', {
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    first_name: {
        type: DataTypes.STRING
    },

    last_name: {
        type: DataTypes.STRING
    },

    email: {
        type: DataTypes.STRING
    },

    password: {
        type: DataTypes.STRING
    }
} ,{
    freezeTableName: true
});

export default User;