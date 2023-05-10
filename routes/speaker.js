const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const controllers = require('../controllers/speaker');

router.get('/', controllers.getAllSpeakers);
router.get('/:id', controllers.getOneSpeaker);
router.post(
  '/',
  body('email').isEmail(),
  body('password').isStrongPassword({ minLength: 5 }),
  body('fullname').isLength({ min: 3 }),
  controllers.addNewSpeaker
);
router.put(
  '/:id',
  body('email').isEmail(),
  body('password').isStrongPassword({ minLength: 5 }),
  body('fullname').isLength({ min: 3 }),
  controllers.updateSpeaker
);
router.delete('/:id', controllers.deleteSpeaker);

module.exports = router;
