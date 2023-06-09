import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import http from 'http';

import users from './users/index.js';
import chats from './chats/index.js';
import socket from './socket.js';

dotenv.config({ path: path.join(__dirname, '.env') });

console.log(path.join(__dirname, '.env'));

const app = express();
const port = process.env.PORT || 9000;
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dev_clone_teams';


const whitelist = [
    'http://localhost:5000', 
    'https://cloneteams.kena.li'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/v1/users', users);
app.use('/v1/chats', chats);

app.use(function(req, res, next) {
    return res.status(404).json({ 
        success: false,
        message: 'Route ' + req.url + ' Not found.',
        data: {}
    });
});

app.use(function(err, req, res, next) {
    return res.status(500).json({ 
        success: false,
        message: 'Something is wrong',
        data: {}
    });
});

// http
const server = http.createServer(app);
// socket
app.io = socket(server);

const start = async () => {
    try {
        await mongoose.connect(mongoURI);

        server.listen(port, () => {
            console.log(`App listening on port ${port}`)
        })
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
  
start();

