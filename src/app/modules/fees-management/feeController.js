import feeService from './feeService.js';
import BaseController from '../shared/baseController.js';

class FeeController extends BaseController {
	constructor() {
		super(feeService);
	}
};
export default new FeeController();
