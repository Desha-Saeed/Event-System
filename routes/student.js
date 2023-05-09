const express = require('express');

const router = express.Router();

const controllers = require('../controllers/student');

router.get('/', controllers.getAllStudents);
router.get('/:id', controllers.getOneStudent);
router.post('/', controllers.addNewStudent);
router.put('/:id', controllers.updateStudent);
router.delete('/:id', controllers.deleteStudent);

module.exports = router;
