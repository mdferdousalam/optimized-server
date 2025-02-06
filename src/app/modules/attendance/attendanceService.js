import BaseService from '../shared/baseService.js';
import attendanceRepository from './attendanceRepository.js';

class AttendanceService extends BaseService {
	constructor() {
		super(attendanceRepository);
	}
}

const attendanceService = new AttendanceService();
export default attendanceService;
