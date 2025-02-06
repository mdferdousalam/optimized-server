import express from 'express';
import AttendanceController from './attendanceController.js';
import authMiddleware from '../../middlewares/auth.js';

const router = express.Router();

router.post(
	'/',
	authMiddleware(['admin', 'teacher']),
	AttendanceController.create,
);
router.get(
	'/',
	authMiddleware(['admin', 'teacher', 'accountant']),
	AttendanceController.getAll,
);
router.get(
	'/:id',
	authMiddleware(['admin', 'teacher', 'accountant']),
	AttendanceController.getById,
);
router.put(
	'/:id',
	authMiddleware(['admin', 'teacher', 'accountant']),
	AttendanceController.updateById,
);
router.delete(
	'/:id',
	authMiddleware(['admin', 'teacher', 'accountant']),
	AttendanceController.deleteById,
);

export default router;
