// routes/assignment.routes.js
import express from "express";
import {
    getAssignmentDetails, // New function to get assignment details     // New function to delete an assignment
} from "../controllers/assignment.controller.js";

const router = express.Router();

// Example: POST /api/faculty/:facultyId/course/:courseId/assignment
router.get("/:courseId/:assignmentId", getAssignmentDetails);


export default router;
