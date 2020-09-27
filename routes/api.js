import express from 'express';
import { Ninja } from '../models/ninja.js';

const router = express.Router();


// Get a list of ninjas within the maxDistance from the database
router.get('/ninjas', (req, res, next) => {
    // Ninja.find({}).then(function(ninjas) {
    //     res.send(ninjas);
    // })
    console.log(req.query.lng);
    Ninja.aggregate().near({
        near: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
        maxDistance: 1000,
        spherical: true,
        distanceField: "dist"
    }).then(ninjas => {
        if (ninjas) {
            if (ninjas.length === 0)
              return res.send({
                message: "maxDistance is too small, or your query params {lng, lat} are incorrect (too big or too small)."
              });
            else return res.send(ninjas);
          }
    }).catch(next)
});

// Add a new ninja to the database
router.post('/ninjas', (req, res, next) => {
    Ninja.create(req.body).then(ninja => {
        res.send(ninja);
    }).catch(next);
});

// Update a ninja in the database
router.put('/ninjas/:id', (req, res, next) => {
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function() {
        Ninja.findOne({_id: req.params.id}).then(ninja => {
            res.send(ninja);
        });
    }).catch(next);
});

// Update a ninja in the database
router.delete('/ninjas/:id', (req, res, next) => {
    Ninja.findByIdAndRemove({_id: req.params.id}).then(ninja => {
        res.send(ninja);
    }).catch(next);
});

export { router }