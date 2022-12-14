const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');


dotenv.config({path: './config/config.env'});

connectDB();

const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const app = express();

//body parser:
app.use(express.json());

if(process.env.NODE_ENV == 'development'){
  app.use(morgan('dev'));
}

app.use('/api/v1/bootcamps',bootcamps);
app.use('/api/v1/courses',courses);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));


process.on('unhandledRejection',(err,promise) => {
  console.log(`Error ${err.message}`.red);
  server.close(() => process.exit(1));
})
