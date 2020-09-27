import express from 'express';
import { Ninja } from '../models/ninja.js';

const router = express.Router();


// Get a list of ninjas from the database
router.get('/ninjas', function(req, res) {
    res.send({type: 'GET'});
});

// Add a new ninja to the database
router.post('/ninjas', function(req, res) {
    Ninja.create(req.body).then(function(ninja) {
        res.send(ninja);
    });
});

// Update a ninja in the database
router.put('/ninjas/:id', function(req, res) {
    res.send({type: 'PUT'});
});

// Update a ninja in the database
router.delete('/ninjas/:id', function(req, res) {
    res.send({type: 'DELETE'});
});

export { router }