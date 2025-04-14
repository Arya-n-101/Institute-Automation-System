import express from "express";
import { 
    getFaculty,
    getFacultyCourses,   // New function to get faculty courses
    getFacultyAssignments // New function to get faculty assignments
} from "../controllers/faculty.controller.js";

const router = express.Router();

// Faculty routes
router.get("/:id", getFaculty);

// New routes for fetching courses and assignments for a faculty
router.get("/:id/courses", getFacultyCourses);
router.get("/:id/course/:courseId/assignments", getFacultyAssignments);


export default router;
