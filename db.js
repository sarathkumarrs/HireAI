const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => console.log("✅ PostgreSQL connected from DB.js"))
  .catch((err) => console.error("❌ Unable to connect to DB:", err));

//DB SYNC
if (process.env.DB_SYNC.toLocaleLowerCase() === "true") {
    sequelize.sync().then(() => {
        console.log("DB sync");
    });
}

module.exports = sequelize;
