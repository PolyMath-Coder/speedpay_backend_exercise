const express = require('express');
const { json, urlencoded } = express;
const { PORT } = require('./config/keys');
const passport = require('passport');
const { connectToDatabase } = require('./config/mongoose');
require('./auth/auth.service')(passport);
const logger = require('./helpers/logger');
const app = express();
const { errorConverter, errorHandler } = require('./helpers/asyncError');
app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/api', require('./routes/routes'));

app.get('/', (req, res) => {
  res
    .status(201)
    .json({ status: true, message: 'Welcome to SpeedPay Finance...' });
});

app.use(errorConverter);
app.use(errorHandler);
connectToDatabase();

app.listen(PORT, () => {
  logger.info(`Server now live at port ${PORT}`);
});
