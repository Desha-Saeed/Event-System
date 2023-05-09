const express = require('express');

const router = express.Router();

const controllers = require('../controllers/speaker');

router.get('/', controllers.getAllSpeakers);
router.get('/:id', controllers.getOneSpeaker);
router.post('/', controllers.addNewSpeaker);
router.put('/:id', controllers.updateSpeaker);
router.delete('/:id', controllers.deleteSpeaker);

module.exports = router;
