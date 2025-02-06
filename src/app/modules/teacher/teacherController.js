import BaseController from '../shared/baseController.js';
import teacherService from './teacherService.js';

class TeacherController extends BaseController {
	constructor() {
		super(teacherService);
	}
}
export default new TeacherController();