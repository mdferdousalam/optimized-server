import BaseService from '../shared/baseService.js';
import userRepository from './userRepository.js';
import jwt from 'jsonwebtoken';
// import secrete from './app/config/index.js';
import * as config from '../../config/index.js';

class UserService extends BaseService {
	constructor() {
		super(userRepository);
	}

	// Additional functions specific to Users
	async getUserByEmail(email) {
		return this.repository.findByEmail(email);
	}

	// login user
	async login(email, password) {
		const user = await this.getUserByEmail(email);

		if (user && user.comparePassword(password)) {
			// generate token
			const token = jwt.sign(
				{ id: user._id, role: user.role, name: user.name },
				config.secrete,
				{ expiresIn: '1d' },
			);
			const data = {
				token,
				user,
			}
			return data;
		}
		return null;
	}

	// password reset
	async passwordReset(email, password) {
		const user = await this.getUserByEmail(email);
		if (user) {
			user.password = password;
			await user.save();
			return user;
		}
		return null;
	}
}

const userService = new UserService();
export default userService;
