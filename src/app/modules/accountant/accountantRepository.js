import BaseRepository from '../shared/baseRepository.js';
import Accountant from './accountantModel.js';

class AccountantRepository extends BaseRepository {
	constructor() {
		super(Accountant);
	}
}

const accountantRepository = new AccountantRepository();
export default accountantRepository;
