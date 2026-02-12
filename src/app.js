const cookieParser = require('cookie-parser');
const express = require('express');
const authRouter = require('./routes/auth.routes');
const musicRouter = require('./routes/music.routes');
const albumRoute = require('./routes/album.routes');
const app = express();

// middleware to run project
app.use(express.json());
app.use(cookieParser());


// Rest APIs

///////////////////////////////////////////////////////////////

// Auth APIS 
app.use('/api/auth', authRouter);


// Music Routes
app.use('/api/music', musicRouter);

// Album Routes
app.use('/api/album', albumRoute);


module.exports = app;