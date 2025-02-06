import BaseRepository from '../shared/baseRepository.js';
import Result from './resultModel.js';

class ResultRepository extends BaseRepository {
	constructor() {
		super(Result);
	}
	async getResultsByStudent(studentId) {
		return await Result.find({ student: studentId })
			.populate('exam')
			.populate('student');
	}
}

const resultRepository = new ResultRepository();
export default resultRepository;
