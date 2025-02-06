import BaseService from '../shared/baseService.js';
import incomeRepository from './incomeRepository.js';

class IncomeService extends BaseService {
	constructor() {
		super(incomeRepository);
	}

}

const incomeService = new IncomeService();
export default incomeService;
