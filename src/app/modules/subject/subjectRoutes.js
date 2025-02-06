import express from 'express';
import SubjectController from './subjectController.js';
import authMiddleware from '../../middlewares/auth.js';


const router = express.Router();

router.post('/', authMiddleware(['admin', 'teacher', 'accountant']), SubjectController.create);
router.get('/', authMiddleware(['admin', 'teacher', 'accountant']), SubjectController.getAll);
router.get('/:id', authMiddleware(['admin', 'teacher', 'accountant']), SubjectController.getById);
router.put('/:id', authMiddleware(['admin', 'teacher', 'accountant']), SubjectController.updateById);
router.delete(
	'/:id',
	authMiddleware(['admin', 'teacher', 'accountant']),
	SubjectController.deleteById,
);

export default router;
