class BaseController {
	constructor(service) {
		this.service = service;
	}

	// Create
	create = async (req, res, next) => {
		try {
			const data = await this.service.create(req.body);
			res
				.status(201)
				.json(this.successResponse(201, 'Created successfully', data));
		} catch (error) {
			next(error);
		}
	};

	// Get All (with pagination, sorting, filtering)
	getAll = async (req, res, next) => {
		try {
			const {
				page = 1,
				limit = 10,
				sort = '-createdAt',
				...filters
			} = req.query;
			const { data, total } = await this.service.findAll(
				filters,
				Number(page),
				Number(limit),
				sort,
			);

			const totalPages = Math.ceil(total / limit);
			res.json(
				this.successResponse(200, 'Fetched successfully', {
					data,
					total,
					page: Number(page),
					limit: Number(limit),
					totalPages,
				}),
			);
		} catch (error) {
			next(error);
		}
	};

	// Get by ID
	getById = async (req, res, next) => {
		try {
			const data = await this.service.findById(req.params.id);
			if (!data) return next({ statusCode: 404, message: 'Not found' });
			res.json(this.successResponse(200, 'Fetched successfully', data));
		} catch (error) {
			next(error);
		}
	};

	// Update by ID
	updateById = async (req, res, next) => {
		try {
			const data = await this.service.updateById(req.params.id, req.body);
			if (!data) return next({ statusCode: 404, message: 'Not found' });
			res.json(this.successResponse(200, 'Updated successfully', data));
		} catch (error) {
			next(error);
		}
	};

	// Delete by ID
	deleteById = async (req, res, next) => {
		try {
			const data = await this.service.deleteById(req.params.id);
			if (!data) return next({ statusCode: 404, message: 'Not found' });
			res.json(this.successResponse(200, 'Deleted successfully'));
		} catch (error) {
			next(error);
		}
	};

	// Standard success response
	successResponse(statusCode, message, data = null) {
		return { success: true, statusCode, message, data };
	}
}

export default BaseController;
