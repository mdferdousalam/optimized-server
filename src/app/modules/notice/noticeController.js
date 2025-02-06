import noticeService from './noticeService.js';
import BaseController from '../shared/baseController.js';

class NoticeController extends BaseController {
	constructor() {
		super(noticeService);
	}
}
export default new NoticeController();