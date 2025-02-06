import mongoose from 'mongoose';
const { Schema } = mongoose;

const incomeSchema = new Schema({
	amount: { type: Number, required: true },
	source: { type: String, required: true },
	date: { type: Date, default: Date.now },
	description: String,
	recordedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Income = mongoose.model('Income', incomeSchema);
export default Income;
