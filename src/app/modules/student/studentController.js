import BaseController from '../shared/baseController.js';
import studentService from './studentService.js';
class StudentController extends BaseController {
	constructor() {
		super(studentService);
	}
}
export default  new StudentController();