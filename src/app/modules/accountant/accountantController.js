import accountantService from './accountantService.js';
import BaseController from '../shared/baseController.js';

class AccountantController extends BaseController {
	constructor() {
		super(accountantService);
	}
}

export default new AccountantController();
