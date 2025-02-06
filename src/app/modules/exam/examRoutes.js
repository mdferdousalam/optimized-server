import express from 'express';
import ExamController from './examController.js';
import authMiddleware from '../../middlewares/auth.js';


const router = express.Router();

router.post('/', authMiddleware(['admin', 'teacher', 'accountant']), ExamController.create);
router.get('/', authMiddleware(['admin', 'teacher', 'accountant']), ExamController.getAll);
router.get('/:id', authMiddleware(['admin', 'teacher', 'accountant']), ExamController.getById);
router.put('/:id', authMiddleware(['admin', 'teacher', 'accountant']), ExamController.updateById);
router.delete(
	'/:id',
	authMiddleware(['admin', 'teacher', 'accountant']),
	ExamController.deleteById,
);

export default router;
