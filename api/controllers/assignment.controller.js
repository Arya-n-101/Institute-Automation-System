// controllers/assignment.controller.js
import { Assignment } from "../models/assignment.model.js";

export const getAssignmentDetails = async (req, res) => {
  try {
    const { courseId, assignmentId } = req.params;

    const assignment = await Assignment.findOne({
      assignmentNumber: assignmentId,
      courseCode: courseId,
    });

    if (!assignment) {
      return res.status(404).json({ success: false, message: "Assignment not found" });
    }

    res.status(200).json({ success: true, assignment });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const editAssignmentDetails = async (req, res) => {
  try {
    const { courseId, assignmentId } = req.params;
    const { title, description, dueDate } = req.body;
    console.log("Received data:", { courseId, assignmentId, title, description, dueDate });

    if (!title || !description || !dueDate) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const assignment = await Assignment.findOneAndUpdate(
      { assignmentNumber: assignmentId, courseCode: courseId },
      { title, description, dueDate },
      { new: true }
    );

    if (!assignment) {
      return res.status(404).json({ success: false, message: "Assignment not found" });
    }

    res.status(200).json({ success: true, message: "Assignment updated successfully", assignment });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteAssignmentDetails = async (req, res) => {
  try {
    console.log("Delete request received for:", { courseId, assignmentId });
    const { courseId, assignmentId } = req.params;

    if (!courseId || !assignmentId) {
      return res.status(400).json({ success: false, message: "Course ID and Assignment ID are required." });
    }

    const deletedAssignment = await Assignment.findOneAndDelete({
      assignmentNumber: assignmentId,
      courseCode: courseId,
    });

    if (!deletedAssignment) {
      return res.status(404).json({ success: false, message: "Assignment not found." });
    }

    res.status(200).json({
      success: true,
      message: "Assignment deleted successfully",
      assignment: deletedAssignment,
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


