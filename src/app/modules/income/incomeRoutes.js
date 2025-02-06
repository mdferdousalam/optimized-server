import express from 'express';
import IncomeController from './incomeController.js';
import authMiddleware from '../../middlewares/auth.js';


const router = express.Router();

router.post('/', authMiddleware(['admin', 'teacher', 'accountant']), IncomeController.create);
router.get(
	'/',
	authMiddleware(['admin', 'teacher', 'accountant']),
	IncomeController.getAll,
);
router.get(
	'/:id',
	authMiddleware(['admin', 'teacher', 'accountant']),
	IncomeController.getById,
);
router.put('/:id', authMiddleware(['admin', 'teacher', 'accountant']), IncomeController.updateById);
router.delete(
	'/:id',
	authMiddleware(['admin', 'teacher', 'accountant']),
	IncomeController.deleteById,
);

export default router;
