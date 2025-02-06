
import { Schema } from "mongoose";
import User from '../user/userModel.js';

const adminSchema = new Schema({
	nid: String,
	qualification: String,
	experience: Number,
	designation: String,
	joiningDate: Date,
	terminationDate: Date,
	salary: Number,
});

const Admin = User.discriminator('admin', adminSchema);
export default Admin;
