import BaseService from '../shared/baseService.js';
import expenseRepository from './expenseRepository.js';

class ExpenseService extends BaseService {
	constructor() {
		super(expenseRepository);
	}
}

const expenseService = new ExpenseService();
export default expenseService;
