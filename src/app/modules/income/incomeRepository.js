import BaseRepository from '../shared/baseRepository.js';
import Income from './incomeModel.js';

class IncomeRepository extends BaseRepository {
	constructor() {
		super(Income);
	}
}

const incomeRepository = new IncomeRepository();
export default incomeRepository;
