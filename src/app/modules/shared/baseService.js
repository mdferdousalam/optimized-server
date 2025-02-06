class BaseService {
	constructor(repository) {
		this.repository = repository;
	}

	async create(data) {
		return this.repository.create(data);
	}

	async findById(id) {
		return this.repository.findById(id);
	}

	async findOne(filter) {
		return this.repository.findOne(filter);
	}

	async findAll(filter, page, limit, sort) {
		return this.repository.findAll(filter, page, limit, sort);
	}

	async updateById(id, updateData) {
		return this.repository.updateById(id, updateData);
	}

	async deleteById(id) {
		return this.repository.deleteById(id);
	}
}

export default BaseService;
