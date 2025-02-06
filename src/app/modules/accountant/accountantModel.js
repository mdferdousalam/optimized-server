
import { Schema } from "mongoose";
import User from '../user/userModel.js';

const accountantSchema = new Schema({
	nid: String,

	qualification: String,
	experience: Number,
	designation: String,
	joiningDate: Date,
	terminationDate: Date,
	salary: Number,
});

const Accountant = User.discriminator('accountant', accountantSchema);
export default Accountant;
