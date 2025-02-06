import mongoose from 'mongoose';
const { Schema } = mongoose;

const examSchema = new Schema({
	examName: {
		type: String,
		required: true,
	},
	subject: {
		type: Schema.Types.ObjectId,
		ref: 'Subject',
		required: true,
	},
	examDate: {
		type: Date,
		required: true,
	},
	maxMarks: Number,
	class: {
		type: Schema.Types.ObjectId,
		ref: 'Class',
	},
});

const Exam = mongoose.model('Exam', examSchema);
export default Exam;	

