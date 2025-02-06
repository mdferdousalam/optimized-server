import express from 'express';
import TeacherController from './teacherController.js';
import authMiddleware from '../../middlewares/auth.js';


const router = express.Router();

router.post(
	'/',
	authMiddleware(['admin', 'teacher', 'accountant']),
	TeacherController.create,
);
router.get(
	'/',
	authMiddleware(['admin', 'teacher', 'accountant']),
	TeacherController.getAll,
);
router.get(
	'/:id',
	authMiddleware(['admin', 'teacher', 'accountant']),
	TeacherController.getById,
);
router.put(
	'/:id',
	authMiddleware(['admin', 'teacher', 'accountant']),
	TeacherController.updateById,
);
router.delete(
	'/:id',
	authMiddleware(['admin', 'teacher', 'accountant']),
	TeacherController.deleteById,
);

export default router;
