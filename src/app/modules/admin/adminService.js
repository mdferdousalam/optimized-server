import BaseService from '../shared/baseService.js';
import adminRepository from './adminRepository.js';

class AdminService extends BaseService {
	constructor() {
		super(adminRepository);
	}
}

const adminService = new AdminService();
export default adminService;
