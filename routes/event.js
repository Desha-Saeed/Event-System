const express = require('express');

const router = express.Router();

const controllers = require('../controllers/event');

router.get('/', controllers.getAllEvents);
router.get('/:id', controllers.getOneEvent);
router.post('/', controllers.addNewEvent);
router.put('/:id', controllers.updateEvent);
router.delete('/:id', controllers.deleteEvent);

module.exports = router;
