import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const noticeSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	content: String,
	audience: {
		type: String,
		enum: ['all', 'students', 'teachers', 'parents'],
		default: 'all',
	},
	publishDate: {
		type: Date,
		default: Date.now,
	},
	expiryDate: Date,
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

const Notice = mongoose.model('Notice', noticeSchema);
export default Notice;
