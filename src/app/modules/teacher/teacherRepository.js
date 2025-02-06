import BaseRepository from '../shared/baseRepository.js';
import Teacher from './teacherModel.js';

class TeacherRepository extends BaseRepository {
	constructor() {
		super(Teacher);
	}
}

const teacherRepository = new TeacherRepository();
export default teacherRepository;
