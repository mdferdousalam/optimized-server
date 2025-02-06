class BaseRepository {
	constructor(model) {
		this.model = model;
	}

	// Create a new document
	async create(data) {
		return await this.model.create(data);
	}

	// Find by ID
	async findById(id) {
		return await this.model.findById(id);
	}

	// Find one by filter
	async findOne(filter) {
		return await this.model.findOne(filter);
	}

	// Find all with pagination, sorting, and filtering
	async findAll(filter = {}, page = 1, limit = 10, sort = '-createdAt') {
		const skip = (page - 1) * limit;
		const total = await this.model.countDocuments(filter);
		const data = await this.model
			.find(filter)
			.sort(sort)
			.skip(skip)
			.limit(limit);
		return { data, total };
	}

	// Update by ID
	async updateById(id, updateData) {
		return await this.model.findByIdAndUpdate(id, updateData, { new: true });
	}

	// Delete by ID
	async deleteById(id) {
		return await this.model.findByIdAndDelete(id);
	}
}

export default BaseRepository;
