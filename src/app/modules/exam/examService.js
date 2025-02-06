import BaseService from '../shared/baseService.js';
import examRepository from './examRepository.js';

class ExamService extends BaseService {
	constructor() {
		super(examRepository);
	}
}

const examService = new ExamService();
export default examService;