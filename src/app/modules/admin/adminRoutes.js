import express from 'express';
import AdminController from './adminController.js';
import authMiddleware from '../../middlewares/auth.js';


const router = express.Router();

router.post('/', authMiddleware(['admin']), AdminController.create);
router.get('/', authMiddleware(['admin']), AdminController.getAll);
router.get('/:id', authMiddleware(['admin']), AdminController.getById);
router.put('/:id', authMiddleware(['admin']), AdminController.updateById);
router.delete('/:id', authMiddleware(['admin']), AdminController.deleteById);

export default router;
