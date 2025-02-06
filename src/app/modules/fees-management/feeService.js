import BaseService from '../shared/baseService.js';
import feeRepository from './feeRepository.js';

class FeeService extends BaseService {
	constructor() {
		super(feeRepository);
	}
	async recordPayment(feeId, paymentData) {
		const fee = await feeRepository.findById(feeId);
		fee.transactions.push(paymentData);
		fee.paymentStatus = this.calculatePaymentStatus(fee);
		return fee.save();
	}

	calculatePaymentStatus(fee) {
		const paidTotal = fee.transactions.reduce((sum, t) => sum + t.amount, 0);
		if (paidTotal >= fee.amount) return 'paid';
		if (paidTotal > 0) return 'partial';
		return 'unpaid';
	}
}

const feeService = new FeeService();
export default feeService;
