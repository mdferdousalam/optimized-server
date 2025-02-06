import BaseRepository from '../shared/baseRepository.js';
import Subject from './subjectModel.js';

class SubjectRepository extends BaseRepository {
	constructor() {
		super(Subject);
	}
}

const subjectRepository = new SubjectRepository();
export default subjectRepository;
