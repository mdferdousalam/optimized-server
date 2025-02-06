import mongoose from 'mongoose';
import { Schema } from 'mongoose';


const attendanceSchema = new Schema({
	student: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	date: {
		type: Date,
		required: true,
		default: Date.now,
	},
	status: {
		type: String,
		enum: ['present', 'absent', 'late', 'excused'],
		required: true,
	},
	class: {
		type: Schema.Types.ObjectId,
		ref: 'Class',
	},
	subject: {
		type: Schema.Types.ObjectId,
		ref: 'Subject',
	},
	markedBy: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
