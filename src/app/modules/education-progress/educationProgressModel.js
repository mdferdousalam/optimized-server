import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const progressSchema = new Schema({
	student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	subject: String,
	date: Date,
	score: Number,
	comments: String,
	teacher: { type: Schema.Types.ObjectId, ref: 'User' },
});

const EducationProgress = mongoose.model('EducationProgress', progressSchema);
export default EducationProgress;
