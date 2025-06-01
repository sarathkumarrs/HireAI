const express = require('express');
const route = require('./routes'); // Loads routes/index.js
const sequelize = require('./db'); // DB config
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: true }));


// Routes
app.use('/', route);

// Connect to DB and start server
const startServer = async () => {
  try {
    await sequelize.authenticate(); // Check DB connection
    console.log('✅ PostgreSQL connected');

    await sequelize.sync({ alter: true }); // Sync all models
    console.log('📦 All models synced with DB');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
  }
};

startServer();
