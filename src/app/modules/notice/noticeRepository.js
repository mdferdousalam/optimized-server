import BaseRepository from '../shared/baseRepository.js';
import Notice from './noticeModel.js';

class NoticeRepository extends BaseRepository {
	constructor() {
		super(Notice);
	}
}

const noticeRepository = new NoticeRepository();
export default noticeRepository;
