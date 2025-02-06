import express from 'express';
import StudentController from './studentController.js';
import authMiddleware from '../../middlewares/auth.js';

const router = express.Router();

router.post(
	'/',
	authMiddleware(['admin', 'teacher', 'accountant']),
	StudentController.create,
);
router.get(
	'/',
	authMiddleware(['admin', 'teacher', 'accountant']),
	StudentController.getAll,
);
router.get(
	'/:id',
	authMiddleware(['admin', 'teacher', 'accountant', 'student']),
	StudentController.getById,
);
router.put('/:id', authMiddleware(['admin', 'teacher', 'accountant', 'student']), StudentController.updateById);
router.delete(
	'/:id',
	authMiddleware(['admin']),
	StudentController.deleteById,
);

export default router;
