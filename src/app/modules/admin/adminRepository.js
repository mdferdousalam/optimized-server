import BaseRepository from '../shared/baseRepository.js';
import Admin from './adminModel.js';

class AdminRepository extends BaseRepository {
	constructor() {
		super(Admin);
	}
}

const adminRepository = new AdminRepository();
export default adminRepository;
