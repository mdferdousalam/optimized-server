
import BaseService from '../shared/baseService.js';
import studentRepository from './studentRepository.js';

class StudentService extends BaseService {
	constructor() {
		super(studentRepository);
	}
}

const studentService = new StudentService();
export default studentService;
