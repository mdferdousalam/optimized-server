import BaseController from '../shared/baseController.js';
import resultService from './resultService.js';

class ResultController extends BaseController {
	constructor() {
		super(resultService);
	}
	// Additional methods can be added here
	getResultByStudentId = async (req, res, next) => {
		try {
			const result = await resultService.getResultsByStudent(req.params.id);
			res.json(this.successResponse(200, 'Result retrieved successfully', result));
		} catch (error) {
			next(error);
		}
	};	
}
export default new ResultController();
