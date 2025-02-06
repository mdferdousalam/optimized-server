import BaseRepository from '../shared/baseRepository.js';
import Exam from './examModel.js';

class ExamRepository extends BaseRepository {
	constructor() {
		super(Exam);
	}
}

const examRepository = new ExamRepository();
export default examRepository;
