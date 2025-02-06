
import BaseService from '../shared/baseService.js';
import accountantRepository from './accountantRepository.js';

class AccountantService extends BaseService {
	constructor() {
		super(accountantRepository);
	}
}

const accountantService = new AccountantService();
export default accountantService;