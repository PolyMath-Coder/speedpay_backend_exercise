const express = require('express');
const { json, urlencoded } = express;
const { PORT } = require('./config/keys');
const { connectToDatabase } = require('./config/mongoose');
const logger = require('./helpers/logger');
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res
    .status(201)
    .json({ status: true, message: 'Welcome to SpeedPay Finance...' });
});

connectToDatabase();

app.listen(PORT, () => {
  logger.info(`Server now live at port ${PORT}`);
});
