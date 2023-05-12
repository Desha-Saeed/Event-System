const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const controllers = require('../controllers/event');
const { authorizeAdmin } = require('../middlewares/authorize');

router.get('/', controllers.getAllEvents);
router.get('/:id', controllers.getOneEvent);
router.post(
  '/',
  body('title').isLength({ min: 3 }),
  body('mainSpeaker').isLength({ min: 3 }),
  authorizeAdmin,
  controllers.addNewEvent
);
router.put(
  '/:id',
  body('title').isLength({ min: 3 }),
  body('mainSpeaker').isLength({ min: 3 }),
  authorizeAdmin,
  controllers.updateEvent
);
router.delete('/:id', authorizeAdmin, controllers.deleteEvent);

module.exports = router;
