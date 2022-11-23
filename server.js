const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');

const bootcamps = require('./routes/bootcamps');
const connectDB = require('./config/db');

dotenv.config({path: './config/config.env'});

const app = express();

connectDB();

//body parser:
app.use(express.json());

app.use('/api/v1/bootcamps',bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));


process.on('unhandledRejection',(err,promise) => {
  console.log(`Error ${err.message}`.red);
  server.close(() => process.exit(1));
})
