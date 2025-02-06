import BaseRepository from '../shared/baseRepository.js';
import Fee from './feeModel.js';

class FeeRepository extends BaseRepository {
	constructor() {
		super(Fee);
	}
}

const feeRepository = new FeeRepository();
export default feeRepository;
