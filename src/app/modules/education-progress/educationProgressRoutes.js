import express from 'express';
import EducationProgressController from './educationProgressController.js';
import authMiddleware from '../../middlewares/auth.js';


const router = express.Router();

router.post('/', authMiddleware(['admin', 'teacher', 'accountant']), EducationProgressController.create);
router.get('/', authMiddleware(['admin', 'teacher', 'accountant']), EducationProgressController.getAll);
router.get('/:id', authMiddleware(['admin', 'teacher', 'accountant']), EducationProgressController.getById);
router.put('/:id', authMiddleware(['admin', 'teacher', 'accountant']), EducationProgressController.updateById);
router.delete(
	'/:id',
	authMiddleware(['admin', 'teacher', 'accountant']),
	EducationProgressController.deleteById,
);

export default router;
