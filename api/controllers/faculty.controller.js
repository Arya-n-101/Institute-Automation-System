import { Faculty } from '../models/faculty.model.js'; // Assuming Faculty model exists
import { Course, FacultyCourse } from '../models/course.model.js'; // Assuming Course model exists
import { Assignment } from '../models/assignment.model.js'; // Assuming Assignment model exists

// Get basic faculty info
export const getFaculty = async (req, res) => {
    const userId = req.params.id;
    
    const faculty = await Faculty.findOne({ userId: userId }).populate('userId');
    
    if (!faculty) {
        return res.status(404).json({ message: 'Faculty not found' });
    }
    
    res.status(200).json(faculty);
};

// Get faculty's courses
export const getFacultyCourses = async (req, res) => {
    const userId = req.params.id;

    try {
        const faculty = await Faculty.findOne({ userId: userId });
        if (!faculty) {
            return res.status(404).json({ message: 'Faculty not found' });
        }

        // Get all faculty course mappings
        const facultyCourses = await FacultyCourse.find({ userId: userId });

        if (!facultyCourses.length) {
            return res.status(404).json({ message: 'No courses found for this faculty' });
        }

        const courseCodes = facultyCourses.map(fc => fc.courseCode);

        // Fetch full course details using courseCodes
        const courses = await Course.find({ courseCode: { $in: courseCodes } });

        return res.status(200).json({ courses });
    } catch (err) {
        console.error("Error fetching faculty courses:", err);
        return res.status(500).json({ message: "Error fetching faculty courses", error: err });
    }
};

// Get faculty's assignments
export const getFacultyAssignments = async (req, res) => {
    const userId = req.params.id;

    try {
        const faculty = await Faculty.findOne({ userId: userId });
        if (!faculty) {
            return res.status(404).json({ message: 'Faculty not found' });
        }

        // Get all assignments created by the faculty
        const assignments = await Assignment.find({ userId: userId });
        return res.status(200).json({ assignments });
    } catch (err) {
        console.error("Error fetching faculty assignments:", err);
        return res.status(500).json({ message: "Error fetching faculty assignments", error: err });
    }
};


