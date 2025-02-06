import BaseRepository from '../shared/baseRepository.js';
import Student from './studentModel.js';

class StudentRepository extends BaseRepository {
	constructor() {
		super(Student);
	}
}

const studentRepository = new StudentRepository();
export default studentRepository;
