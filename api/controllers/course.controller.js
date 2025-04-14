import { Course } from '../models/course.model.js';
import { Assignment } from '../models/assignment.model.js'; // ⬅️ Make sure this path is correct

// Get a specific course by courseCode
export const getCourse = async (req, res) => {
    try {
        const courseCode = req.params.id; // 'id' is actually the courseCode

        if (!courseCode) {
            return res.status(400).json({ success: false, message: 'Course code is required' });
        }

        const course = await Course.findOne({ courseCode });

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        return res.status(200).json({
            success: true,
            data: course
        });
    } catch (error) {
        console.error('Error fetching course details:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Get all courses
export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();

        return res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
        });
    } catch (error) {
        console.error('Error fetching all courses:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// ✅ Get all assignments for a specific course
export const getCourseAssignments = async (req, res) => {
    const courseId = req.params.id;
    console.log('Course ID:', courseId); // Debugging line
    if (!courseId) {
        return res.status(400).json({ success: false, message: 'Course ID is required' });
    }

    try {
        const assignments = await Assignment.find({ courseCode: courseId });

        return res.status(200).json({
            success: true,
            count: assignments.length,
            assignments
        });
    } catch (error) {
        console.error('Error fetching course assignments:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};


export const createAssignment = async (req, res) => {
  const courseId  = req.params.id;
  try {
    const { title, description, dueDate } = req.body;
    console.log(title, description, dueDate, courseId); // Debugging line
    if (!title || !description || !dueDate || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields.",
      });
    }

    // Count current assignments to assign a new assignmentNumber
    const assignmentCount = await Assignment.countDocuments({ courseCode: courseId });

    // console.log(assignmentCount); // Debugging line
    const newAssignment = new Assignment({
      assignmentNumber: assignmentCount + 1,
      courseCode: courseId,
      title,
      description,
      dueDate: new Date(dueDate), // Ensure proper Date format
      submissions: [],             // Start with empty submissions
      createdAt: new Date(),
      updatedAt: new Date()
    });



    await newAssignment.save();

    res.status(201).json({
      success: true,
      message: "Assignment created successfully",
      assignment: newAssignment,
    });
  } catch (error) {
    console.error("Error creating assignment:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

