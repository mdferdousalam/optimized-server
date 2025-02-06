import BaseRepository from '../shared/baseRepository.js';
import EducationProgress from './educationProgressModel.js';

class EducationProgressRepository extends BaseRepository {
	constructor() {
		super(EducationProgress);
	}
}

const educationProgressRepository = new EducationProgressRepository();
export default educationProgressRepository;
