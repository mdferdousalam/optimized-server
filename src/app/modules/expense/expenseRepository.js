import BaseRepository from '../shared/baseRepository.js';
import Expense from './expenseModel.js';

class ExpenseRepository extends BaseRepository {
	constructor() {
		super(Expense);
	}
}

const expenseRepository = new ExpenseRepository();
export default expenseRepository;
