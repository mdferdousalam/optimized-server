import BaseService from '../shared/baseService.js';
import noticeRepository from './noticeRepository.js';

class NoticeService extends BaseService {
	constructor() {
		super(noticeRepository);
	}
}

const noticeService = new NoticeService();
export default noticeService;
