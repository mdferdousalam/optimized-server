import express from 'express';
import NoticeController from './noticeController.js';
import authMiddleware from '../../middlewares/auth.js';


const router = express.Router();

router.post(
	'/',
	authMiddleware(['admin', 'teacher', 'accountant']),
	NoticeController.create,
);
router.get(
	'/',
	authMiddleware(['admin', 'teacher', 'accountant']),
	NoticeController.getAll,
);
router.get(
	'/:id',
	authMiddleware(['admin', 'teacher', 'accountant']),
	NoticeController.getById,
);
router.put(
	'/:id',
	authMiddleware(['admin', 'teacher', 'accountant']),
	NoticeController.updateById,
);
router.delete(
	'/:id',
	authMiddleware(['admin', 'teacher', 'accountant']),
	NoticeController.deleteById,
);

export default router;
