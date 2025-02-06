import educationProgressService from './educationProgressService.js';
import BaseController from '../shared/baseController.js';

class EducationProgressController extends BaseController {
	constructor() {
		super(educationProgressService);
	}
}

export default new EducationProgressController();