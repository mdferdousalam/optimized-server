import express from 'express';
import FeeController from './feeController.js';
import authMiddleware from '../../middlewares/auth.js';


const router = express.Router();

router.post('/', authMiddleware(['admin', 'teacher', 'accountant']), FeeController.create);
router.get('/', authMiddleware(['admin', 'teacher', 'accountant']), FeeController.getAll);
router.get('/:id', authMiddleware(['admin', 'teacher', 'accountant']), FeeController.getById);
router.put('/:id', authMiddleware(['admin', 'teacher', 'accountant']), FeeController.updateById);
router.delete(
	'/:id',
	authMiddleware(['admin', 'teacher', 'accountant']),
	FeeController.deleteById,
);

export default router;
