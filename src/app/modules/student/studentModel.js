import { Schema } from 'mongoose';
import User from '../user/userModel.js';



const studentSchema = new Schema({
	guardian: {
		name: String,
		phone: String,
		address: {
			village: String,
			post: String,
			upazila: String,
			district: String,
		},
	},
	class: String,
	section: String,
	rollNo: String,
	birthId: { type: String, unique: true },
	fatherName: String,

	enrolmentDate: Date,
	passingDate: Date,
	
	feeDetails: {
		total: Number,
		paid: Number,
		due: Number,
	},
});

const Student = User.discriminator('student', studentSchema);
export default Student;
