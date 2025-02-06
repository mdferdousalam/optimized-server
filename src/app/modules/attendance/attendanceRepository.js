import BaseRepository from '../shared/baseRepository.js';
import Attendance from './attendanceModel.js';

class AttendanceRepository extends BaseRepository {
	constructor() {
		super(Attendance);
	}
}

const attendanceRepository = new AttendanceRepository();
export default attendanceRepository;
