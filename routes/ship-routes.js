const express = require('express');
const router = express.Router();
const Starship = require('./../models/starship/starship');

router.get('/', (req, res) => {
    res.json({ message: "Congrats! App works!" })
});

router.route('/starships')
    .get((req, res) => {
        Starship.find((err, starships) => {
            if (err) {
                res.json({ status: "failure", error: err });
            }
            res.json(starships);
        });
    })
    .post((req, res) => {
        Starship.count({ registry: req.body.registry }, (err, count) => {
            if (err) {
                console.log(err);
            }
            if (count > 0) {
                res.json({ status: "failure",
                           error: "Starship with Registry " + req.body.registry + " already exists." });
            } else {
                var starship = new Starship();

                starship.name           = req.body.name;
                starship.registry       = req.body.registry;
                starship.class          = req.body.class;
                starship.service_start  = req.body.service_start;

                starship.save((err) => {
                    if (err) {
                        res.json({ status: "failure", error: err });
                    }
                    res.json({ status: "success", error: null });
                })
            }
        })
    });

router.route('/starships/:registry')
    .get((req, res) => {
        Starship.findOne({ registry: req.params.registry }, (err, ship) => {
            if (err) {
                res.send(err);
            } else {
                if (ship == null) {
                    res.json({ status: "success",
                               error: null,
                               message: "A ship with registry: " + req.params.registry + " does not exist." });
                } else {
                    res.json(ship);
                }
            }
        });
    })
    .put((req, res) => {

    })
    .delete((req, res) => {
        Starship.remove({
            registry: req.params.registry
        }, (err, ship) => {
            if (err) {
                res.json({ status: "failure", error: err });
            } else {
                if (ship == null) {
                    res.json({ status: "success",
                               error: null,
                               message: "A ship with registry: " + req.params.registry + " does not exist." })
                } else {
                    res.json({ status: "success",
                               error: null,
                               message: "Ship successfully removed from shipyard." });
                }
            }
        });
    })



module.exports = router;
