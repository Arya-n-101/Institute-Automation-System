import express from "express";
import { 
    getStudent, 
    getStudentBonafideDetails, 
    createBonafideApplication,
    getBonafideApplications,
    getStudentCourses,   // New function to get student courses
    getStudentAssignments // New function to get student assignments
} from "../controllers/student.controller.js";

const router = express.Router();

// Basic student routes
router.get("/:id", getStudent);

// Bonafide routes
router.get("/:id/bonafide", getStudentBonafideDetails);
router.post("/:id/bonafide/apply", createBonafideApplication);
router.get("/:id/bonafide/applications", getBonafideApplications);

// New routes for fetching courses and assignments for a student
router.get("/:id/courses", getStudentCourses);
router.get("/:id/assignments", getStudentAssignments);

export default router;
