import express from 'express';
import ClassController from './classController.js';
import authMiddleware from '../../middlewares/auth.js';


const router = express.Router();

router.post('/', authMiddleware(['admin', 'teacher', 'accountant']), ClassController.create);
router.get('/', authMiddleware(['admin', 'teacher', 'accountant']), ClassController.getAll);
router.get('/:id', authMiddleware(['admin', 'teacher', 'accountant']), ClassController.getById);
router.put('/:id', authMiddleware(['admin', 'teacher', 'accountant']), ClassController.updateById);
router.delete(
	'/:id',
	authMiddleware(['admin', 'teacher', 'accountant']),
	ClassController.deleteById,
);

export default router;
