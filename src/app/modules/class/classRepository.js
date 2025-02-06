import BaseRepository from '../shared/baseRepository.js';
import Class from './classModel.js';

class ClassRepository extends BaseRepository {
	constructor() {
		super(Class);
	}
}

const classRepository = new ClassRepository();
export default classRepository;
