import BaseService from '../shared/baseService.js';
import subjectRepository from './subjectRepository.js';

class SubjectService extends BaseService {
	constructor() {
		super(subjectRepository);
	}
}

const subjectService = new SubjectService();
export default subjectService;
