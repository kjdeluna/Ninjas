import express from 'express';
import { router as ninjasRoutes } from './routes/api.js';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();

// Connect to mongodb
mongoose.connect('mongodb://localhost/ninjago');

// Because mongoose promise is deprecated
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use('/api', ninjasRoutes);

app.listen(process.env.port || 4000, function() {
    console.log("Now listening for requests");

});