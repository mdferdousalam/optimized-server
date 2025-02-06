import BaseRepository from'../shared/baseRepository.js';
import User from './userModel.js';



class UserRepository extends BaseRepository {
	constructor() {
		super(User);
	}

	// Custom function for Users if needed
	async findByEmail(email) {
		return this.model.findOne({ email });
	}
}
const userRepository = new UserRepository();
export default userRepository;
