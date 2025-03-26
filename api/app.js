const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: 'http://localhost:9000',
    optionsSuccessStatus: 200
  };
  app.use(cors(corsOptions));

app.use(cors());
app.use(express.json());

const articleRoutes = require('./src/modules/routes/articleRoutes');
const commentRoutes = require('./src/modules/routes/commentRoutes');

app.use('/articles', articleRoutes);
app.use('/comments', commentRoutes);

module.exports = app;