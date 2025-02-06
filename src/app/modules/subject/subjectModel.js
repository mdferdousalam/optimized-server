import mongoose from 'mongoose';
const { Schema } = mongoose;

const subjectSchema = new Schema({
	subjectName: {
		type: String,
		required: true,
	},
	subjectCode: String,
	teacher: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	class: {
		type: Schema.Types.ObjectId,
		ref: 'Class',
	},
});

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;
