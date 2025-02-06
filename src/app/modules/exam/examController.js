import examService from './examService.js';
import BaseController from '../shared/baseController.js';

class ExamController extends BaseController {
	constructor() {
		super(examService);
	}
}

export default new ExamController();