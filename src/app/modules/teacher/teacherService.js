
import BaseService from '../shared/baseService.js';
import teacherRepository from './teacherRepository.js';

class TeacherService extends BaseService {
	constructor() {
		super(teacherRepository);
	}
}

const teacherService = new TeacherService();
export default teacherService;