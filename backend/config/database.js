import { Sequelize } from "sequelize";

const db = new Sequelize('products_db','root','12345678',{
    host: "localhost",
    dialect: "mysql"
})

export default db