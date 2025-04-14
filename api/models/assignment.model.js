import mongoose from 'mongoose';

// Embedded Submission Schema
const submissionSchema = new mongoose.Schema({
  studentRollNo: {
    type: String,
    required: true,
    ref: 'Student' // reference by rollNo
  },
  studentName: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

// Main Assignment Schema
const assignmentSchema = new mongoose.Schema({
  assignmentNumber: {
    type: Number,
    required: true,
  },
  courseCode: {
    type: String,
    required: true,
    ref: 'Course'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  dueDate: {
    type: Date,
    required: true
  },
  submissions: [submissionSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export const Assignment = mongoose.model('Assignment', assignmentSchema);
