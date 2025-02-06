import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const resultSchema = new Schema({
	student: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	exam: {
		type: Schema.Types.ObjectId,
		ref: 'Exam',
		required: true,
	},
	marksObtained: Number,
	grade: String,
	comments: String,
});

const Result = mongoose.model('Result', resultSchema);
export default Result;

