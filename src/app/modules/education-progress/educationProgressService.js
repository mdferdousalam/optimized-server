import BaseService from '../shared/baseService.js';
import educationProgressRepository from './educationProgressRepository.js';

class EducationProgressService extends BaseService {
	constructor() {
		super(educationProgressRepository);
	}
}

const educationProgressService = new EducationProgressService();
export default educationProgressService;
