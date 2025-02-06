import express from 'express';
import AccountantController from './accountantController.js';
import authMiddleware from '../../middlewares/auth.js';

const router = express.Router();

router.post('/', authMiddleware(['admin']), AccountantController.create);
router.get('/', authMiddleware(['admin']), AccountantController.getAll);
router.get(
	'/:id',
	authMiddleware(['admin', 'accountant']),
	AccountantController.getById,
);
router.put(
	'/:id',
	authMiddleware(['admin', 'accountant']),
	AccountantController.updateById,
);
router.delete(
	'/:id',
	authMiddleware(['admin']),
	AccountantController.deleteById,
);

export default router;
