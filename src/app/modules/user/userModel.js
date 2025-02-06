import { Schema } from "mongoose";
import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new Schema(
	{
		name: { type: String, required: true },
		//as each student will not have a email address, so it is not required
		email: { type: String, unique: true },
		password: { type: String, required: true },
		role: {
			type: String,
			enum: ['admin', 'student', 'teacher', 'accountant'],
			required: true,
		},
		phone: String,
		address: {
			village: String,
			post: String,
			upazila: String,
			district: String,
		},
		dob: { type: Date, required: true },
		bloodGroup: {
			type: String,
			enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
		},
		profilePic: String,
		gender: {
			type: String,
			enum: ['male', 'female'],
			default: "male",
		},
		isVerified: { type: Boolean, default: false },
		isActive: { type: Boolean, default: true },
		isDeleted: { type: Boolean, default: false },
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now },

	},
	{ discriminatorKey: 'role' },
);

userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 10);
	}
	next();
});

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
