const express       = require('express');
const router        = express.Router();
const respBuilder   = require('./../lib/responseBuilder');
const constants     = require('./../lib/constants');
const Starship      = require('./../models/starship/starship');

const codes = constants.http_codes;

router.get('/', (req, res) => {
    res.json({ message: "Congrats! App works!" });
});

router.route('/starships')
    // Get all ships
    .get((req, res) => {
        Starship.find((err, starships) => {
            if (err) {
                res.status(codes.ERROR);
                res.json(respBuilder("MongoDB Error.", err));
            }
            res.json(starships);
        });
    })
    // Add a ship
    .post((req, res) => {

        const reg = req.body.registry;

        Starship.count({ registry: reg }, (err, count) => {
            if (err) {
                res.json(respBuilder("MongoDB Error.", err));
            }
            if (count > 0) {
                res.status(codes.LOCKED);
                res.json(respBuilder("Starship with Registry " + reg + " already exists.", "Duplicate-Ship"));
            } else {
                var starship = new Starship();

                starship.name           = req.body.name;
                starship.registry       = req.body.registry;
                starship.class          = req.body.class;
                starship.service_start  = req.body.service_start;

                starship.save((err) => {
                    if (err) {
                        res.status(codes.ERROR);
                        res.json(respBuilder("MongoDB Error.", err));
                    } else {
                        res.status(codes.ACCEPTED);
                        res.json(respBuilder("Starship created!"));
                    }
                })
            }
        });
    });

router.route('/starships/:registry')
    // Get a ship by its registry number
    .get((req, res) => {

        const reg = req.params.registry;

        Starship.findOne({ registry: reg }, (err, ship) => {
            if (err) {
                res.status(codes.ERROR);
                res.json(respBuilder("MongoDB Error.", err));
            } else {
                if (ship == null) {
                    res.status(codes.NOT_FOUND);
                    res.json(respBuilder("A ship with registry: " + reg + " does not exist."));
                } else {
                    res.json(ship);
                }
            }
        });
    })
    // Edit a ship
    .put((req, res) => {

        const reg   = req.params.registry;
        const input = req.body;
        // Find the ship
        Starship.findOne({ registry: reg }, (err, ship) => {
            if (err) {
                res.status(codes.ERROR);
                res.json(respBuilder("MongoDB Error.", err));
            } else {
                if (ship == null) {
                    res.status(codes.NOT_FOUND);
                    res.json(respBuilder("A ship with registry: " + reg + " does not exist."));
                } else {
                    // Edit the ship
                    for (var shipprop in ship) {
                        for (var inprop in input) {
                            if (shipprop == inprop) {
                                ship[inprop] = input[inprop];
                            }
                        }
                    }
                    ship.save((err) => {
                        if (err) {
                            res.status(codes.ERROR);
                            res.json(respBuilder("MongoDB Error.", err));
                        } else {
                            res.status(codes.ACCEPTED);
                            res.json(respBuilder("Starship with registry: " + reg + " updated!"));
                        }
                    });
                }
            }
        });
    })
    // Remove a ship by its registry number
    .delete((req, res) => {

        const reg = req.params.registry;

        Starship.findOne({ registry: reg }, (err, ship) => {
            if (err) {
                res.status(codes.ERROR);
                res.json(respBuilder("MongoDB Error.", err));
            } else {
                if (ship == null) {
                    res.status(codes.NOT_FOUND);
                    res.json(respBuilder("A ship with registry: " + reg + " does not exist."));
                } else {
                    Starship.remove({
                        registry: reg
                    }, (err) => {
                        if (err) {
                            res.status(codes.ERROR);
                            res.json(respBuilder("MongoDB Error.", err));
                        } else {
                            if (ship == null) {
                                res.status(codes.NOT_FOUND);
                                res.json(respBuilder("A ship with registry: " + reg + " does not exist."))
                            } else {
                                res.json(respBuilder("Ship successfully removed from shipyard."));
                            }
                        }
                    });
                }
            }
        });
    });

module.exports = router;
