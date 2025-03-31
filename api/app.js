const express = require('express');
const cors = require('cors');
const { sequelize } = require('./src/modules/models/index');

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 204,
  preflightContinue: false
};

app.use(cors(corsOptions));

app.options('*', cors());

app.use(express.json());

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

const articleRoutes = require('./src/modules/routes/articleRoutes');
const commentRoutes = require('./src/modules/routes/commentRoutes');

app.use('/articles', articleRoutes);
app.use('/comments', commentRoutes);

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    details: err.message 
  });
});

module.exports = app;