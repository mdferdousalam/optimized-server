import mongoose from 'mongoose';
const { Schema } = mongoose;

const expenseSchema = new Schema({
	amount: { type: Number, required: true },
	category: { type: String, required: true },
	date: { type: Date, default: Date.now },
	description: String,
	approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;
