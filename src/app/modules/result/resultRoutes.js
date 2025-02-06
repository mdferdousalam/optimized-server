import express from 'express';
import ResultController from './resultController.js';
import authMiddleware from '../../middlewares/auth.js';


const router = express.Router();

router.post('/', authMiddleware(['admin', 'teacher', 'accountant']), ResultController.create);
router.get(
	'/',
	authMiddleware(['admin', 'teacher', 'accountant']),
	ResultController.getAll,
);
router.get(
	'/student/:studentId',
	authMiddleware(['admin', 'teacher', 'accountant', 'student']),
	ResultController.getResultByStudentId,
);
router.get('/:id', authMiddleware(['admin', 'teacher', 'accountant', 'student']), ResultController.getById);
router.put('/:id', authMiddleware(['admin', 'teacher', 'accountant']), ResultController.updateById);
router.delete(
	'/:id',
	authMiddleware(['admin', 'teacher', 'accountant']),
	ResultController.deleteById,
);

export default router;
