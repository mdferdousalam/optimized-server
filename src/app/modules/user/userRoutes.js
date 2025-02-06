import express from 'express';
import UserController from './userController.js';
import authMiddleware from '../../middlewares/auth.js';

const router = express.Router();

router.post('/', UserController.create);
router.post('/login', UserController.login);
router.post('/reset-password', UserController.resetPassword);
router.get(
	'/',
	authMiddleware(['admin', 'teacher', 'accountant']),
	UserController.getAll,
);
router.get(
	'/:id',
	authMiddleware(['admin', 'teacher', 'accountant', 'student']),
	UserController.getById,
);
router.put(
	'/:id',
	authMiddleware(['admin', 'teacher', 'accountant', 'student']),
	UserController.updateById,
);
router.delete(
	'/:id',
	authMiddleware(['admin', 'teacher', 'accountant']),
	UserController.deleteById,
);

// module.exports = router;
export default router;
