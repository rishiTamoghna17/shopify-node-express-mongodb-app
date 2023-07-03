import mongoose from "mongoose";


const ticketSchema = new mongoose.Schema({
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: mongoose.Types.ObjectId
  },
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requester: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum:['Low', 'Medium', 'High'],
  },
  support: {
    type: String,
    enum: ['Human', 'Automation'],
    required: true
  },
  isComplete: {
    type: Boolean,
    required: true,
    default: false
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  solvedAt: {
    type: Date
  }
});
ticketSchema.pre('save', function (next) {
    if (this.isComplete) {
      this.solvedAt = new Date();
    }
    next();
  });

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;