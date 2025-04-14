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

