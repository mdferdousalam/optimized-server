import mongoose from 'mongoose';
const { Schema } = mongoose;



const feeSchema = new Schema({
	student: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	paymentDate: Date,
	totalDue: Number,
	paymentStatus: {
		type: String,
		enum: ['paid', 'unpaid', 'partial'],
		default: 'unpaid',
	},
	paymentMethod: String,
	paymentReference: String,
	receivedBy: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
},{timestamps:true});

const Fee = mongoose.model('Fee', feeSchema);
export default Fee;