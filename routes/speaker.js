const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const Speaker = require('../models/speaker');

const controllers = require('../controllers/speaker');
const { authorizeAdmin, userOrAdmin } = require('../middlewares/authorize');

router.get('/', controllers.getAllSpeakers);
router.get('/:id', controllers.getOneSpeaker);
router.post(
  '/',
  body('email').isEmail(),
  body('password').isStrongPassword({ minLength: 5 }),
  body('fullname').isLength({ min: 3 }),
  authorizeAdmin,
  controllers.addNewSpeaker
);
router.put(
  '/:id',
  body('email').isEmail(),
  body('password').isStrongPassword({ minLength: 5 }),
  body('fullname').isLength({ min: 3 }),
  userOrAdmin(Speaker),
  controllers.updateSpeaker
);
router.delete('/:id', controllers.deleteSpeaker);

module.exports = router;
