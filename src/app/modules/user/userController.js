import BaseController from '../shared/baseController.js';
import userService from './userService.js';

class UserController extends BaseController {
	constructor() {
		super(userService);
	}
	// Additional methods (e.g., login, password reset) can be added here
	login = async (req, res, next) => {
		try {
			const { email, password } = req.body;
			const user = await userService.login(email, password);
			res.json(this.successResponse(200, 'Login successful', user));
		} catch (error) {
			next(error);
		}
	};

	resetPassword = async (req, res, next) => {
		try {
			const user = await userService.passwordReset(req.body);
			res.json(this.successResponse(200, 'Password reset successful', user));
		} catch (error) {
			next(error);
		}
	};
}
export default new UserController();
