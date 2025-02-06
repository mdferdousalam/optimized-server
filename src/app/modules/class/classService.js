import BaseService from '../shared/baseService.js';
import classRepository from './classRepository.js';

class ClassService extends BaseService {
	constructor() {
		super(classRepository);
	}
}

const classService = new ClassService();
export default classService;
