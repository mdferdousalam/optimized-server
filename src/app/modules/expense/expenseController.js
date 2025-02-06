import expenseService from './expenseService.js';
import BaseController from '../shared/baseController.js';

class ExpenseController extends BaseController {
	constructor() {
		super(expenseService);
	}
}

export default new ExpenseController();