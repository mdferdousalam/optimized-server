import adminService from './adminService.js';
import BaseController from '../shared/baseController.js';

class AdminController extends BaseController {
	constructor() {
		super(adminService);
	}
}

export default new AdminController();