import express from "express";
import { 
   getCourse,
    getCourseAssignments, // New function to get course assignments
    createAssignment // New function to create an assignment
} from "../controllers/course.controller.js";

const router = express.Router();

// Basic student routes
router.get("/:id", getCourse);
router.get("/:id/assignments", getCourseAssignments); // New route to get assignments for a course
router.post("/:id/assignments", createAssignment);
export default router;
