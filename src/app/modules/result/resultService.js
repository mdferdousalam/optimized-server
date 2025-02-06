import BaseService from '../shared/baseService.js';
import resultRepository from './resultRepository.js';

class ResultService extends BaseService {
	constructor() {
		super(resultRepository);
	}

	async getResultsByStudent(studentId) {
		return await resultRepository.getResultsByStudent(studentId);
	}
}

const resultService = new ResultService();
export default resultService;
