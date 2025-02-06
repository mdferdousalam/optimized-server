import incomeService from './incomeService.js';
import BaseController from '../shared/baseController.js';

class IncomeController extends BaseController {
	constructor() {
		super(incomeService);
	}
}
export default new IncomeController();

