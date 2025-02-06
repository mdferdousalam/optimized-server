import BaseController from '../shared/baseController.js';
import subjectService from './subjectService.js';

class SubjectController extends BaseController {
	constructor() {
		super(subjectService);
	}
}

export default new SubjectController();
