import express from 'express';
import ExpenseController from './expenseController.js';
import authMiddleware from '../../middlewares/auth.js';


const router = express.Router();

router.post('/', authMiddleware(['admin', 'teacher', 'accountant']), ExpenseController.create);
router.get('/', authMiddleware(['admin', 'teacher', 'accountant']), ExpenseController.getAll);
router.get('/:id', authMiddleware(['admin', 'teacher', 'accountant']), ExpenseController.getById);
router.put('/:id', authMiddleware(['admin', 'teacher', 'accountant']), ExpenseController.updateById);
router.delete(
	'/:id',
	authMiddleware(['admin', 'teacher', 'accountant']),
	ExpenseController.deleteById,
);

export default router;
