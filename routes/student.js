const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const controllers = require('../controllers/student');

router.get('/', controllers.getAllStudents);
router.get('/:id', controllers.getOneStudent);
router.post(
  '/',
  body('email').isEmail(),
  body('password').isStrongPassword({ minLength: 5 }),
  body('fullname').isLength({ min: 3 }),

  controllers.addNewStudent
);
router.put(
  '/:id',
  body('email').isEmail(),
  body('password').isStrongPassword({ minLength: 5 }),
  body('fullname').isLength({ min: 3 }),
  controllers.updateStudent
);
router.delete('/:id', controllers.deleteStudent);
router.delete('/', controllers.deleteAllStudents);

module.exports = router;
