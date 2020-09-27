import express from 'express';
import { router as ninjasRoutes } from './routes/api.js';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();

// Connect to mongodb
mongoose.connect('mongodb://localhost/ninjago');

// Because mongoose promise is deprecated
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(bodyParser.json());

// Initialize routes
app.use('/api', ninjasRoutes);

// Error-handling middleware
app.use(function(err, req, res, next) {
    res.status(422).send({error: err.message});
});

app.listen(process.env.port || 4000, function() {
    console.log("Now listening for requests");

});