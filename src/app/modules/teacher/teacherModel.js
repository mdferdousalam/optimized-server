
import { Schema } from "mongoose";
import User from '../user/userModel.js';

const teacherSchema = new Schema({
	nid: String,
	subject: String,
	qualification: String,
	experience: Number,
	designation: String,
	joiningDate: Date,
	terminationDate: Date,
	salary: Number,
});

const Teacher = User.discriminator('teacher', teacherSchema);
export default Teacher;
