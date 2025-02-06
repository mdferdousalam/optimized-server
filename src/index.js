import app from './app.js';
import * as config from './app/config/index.js';
import mongoose from 'mongoose';

async function main() {
	try {
		// await mongoose.connect(config.database_url);
		await mongoose.connect(config.database_url);
		console.log('Database is connected successfully');

		app.listen(config.port, () => {
			console.log(`server is running on port ${config.port}`);
		});
	} catch (error) {
		console.log(error);
	}
}

main();
