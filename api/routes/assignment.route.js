// routes/assignment.routes.js
import express from "express";
import {
    getAssignmentDetails, editAssignmentDetails,deleteAssignmentDetails // New function to get assignment details     // New function to delete an assignment
} from "../controllers/assignment.controller.js";

const router = express.Router();

// Example: POST /api/faculty/:facultyId/course/:courseId/assignment
router.get("/:courseId/:assignmentId", getAssignmentDetails);
router.put("/:courseId/:assignmentId", editAssignmentDetails); // Update assignment details
router.delete("/:courseId/:assignmentId",deleteAssignmentDetails); 
// Delete assignment
export default router;
