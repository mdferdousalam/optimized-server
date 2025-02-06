import classService from './classService.js';
import BaseController from '../shared/baseController.js';

class ClassController extends BaseController {
	constructor() {
		super(classService);
	}
}

export default new ClassController();