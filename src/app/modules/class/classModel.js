import mongoose from 'mongoose';
const { Schema } = mongoose;

const classSchema = new Schema({
	className: {
		type: String,
		required: true,
	},
	gradeLevel: Number,
	academicYear: String,
	classTeacher: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	students: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	],
});


const Class = mongoose.model('Class', classSchema);
export default Class;
