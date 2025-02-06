import jwt from 'jsonwebtoken';
import User from '../modules/user/userModel.js';

const authMiddleware = (allowedRoles = []) => {
	return async (req, res, next) => {
		try {
			const token = req.header('Authorization')?.split(' ')[1];
			if (!token) {
				return res.status(401).json({ message: 'Access denied' });
			}

			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			const user = await User.findById(decoded.id);
			if (!user) {
				return res.status(401).json({ message: 'User not found' });
			}

			// Check if the user's role is included in the allowed roles
			if (!allowedRoles.includes(user.role)) {
				return res
					.status(403)
					.json({ message: 'Forbidden: You do not have access' });
			}

			req.user = user;
			next();
		} catch (error) {
			res.status(401).json({ message: 'Invalid token' });
		}
	};
};

export default authMiddleware;
