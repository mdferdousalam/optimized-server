import attendanceService from './attendanceService.js';
import BaseController from '../shared/baseController.js';

class AttendanceController extends BaseController {
	constructor() {
		super(attendanceService);
	}
}

export default new AttendanceController();