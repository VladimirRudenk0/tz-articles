const express = require('express');
const cors = require('cors');
const { sequelize } = require('./src/modules/models/index');

const app = express();

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Connection error:', err));

sequelize.sync()
  .then(() => console.log('Models synced'))
  .catch(err => console.error('Sync error:', err));

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

const articleRoutes = require('./src/modules/routes/articleRoutes');
const commentRoutes = require('./src/modules/routes/commentRoutes');

app.use('/article', articleRoutes);
app.use('/comment', commentRoutes);

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    details: err.message 
  });
});

module.exports = app;