import { Student } from '../models/student.model.js';
import { ApplicationDocument, Bonafide } from '../models/documents.models.js';
import { StudentCourse } from '../models/course.model.js'; // Assuming studentCourse model exists
import { Assignment } from '../models/assignment.model.js'; // Assuming Assignment model exists
// Get basic student info
export const getStudent = async (req, res) => {
    const studentId = req.params.id;
    console.log(studentId)
    const user = await Student.findOne({ userId: studentId })
        .populate('userId') // populate the userId field and get the name field
    if (!user) {
        return res.status(404).json({ message: 'Student not found' });
    }
    
    res.status(200).json(user);
    console.log("Student details fetched successfully", user);
};

// Get student details for bonafide
export const getStudentBonafideDetails = async (req, res) => {
    try {
        const studentId = req.params.id;
        
        const student = await Student.findOne({ userId: studentId })
            .populate('userId', 'name dateOfBirth'); 
            
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const studentDetails = {
            name: student.userId.name,
            rollNo: student.rollNo,
            fatherName: student.fatherName,
            dateOfBirth: student.userId.dateOfBirth,
            program: student.program,
            department: student.department,
            hostel: student.hostel,
            roomNo: student.roomNo,
            semester: student.semester,
            batch: student.batch,
            enrolledYear: student.batch
        };

        res.status(200).json(studentDetails);
    } catch (error) {
        console.error('Error fetching student bonafide details:', error);
        res.status(500).json({ message: 'Error fetching student details' });
    }
};

// Create new bonafide application
export const createBonafideApplication = async (req, res) => {
    try {
        const studentId = req.params.id;
        const { currentSemester, certificateFor, otherReason } = req.body;

        // Find student
        const student = await Student.findOne({ userId: studentId });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Create application document
        const applicationDoc = new ApplicationDocument({
            studentId: student._id,
            documentType: 'Bonafide',
            status: 'Pending'
        });
        await applicationDoc.save();

        console.log('created application request' , applicationDoc)
        // Create bonafide document
        const bonafide = new Bonafide({
            applicationId: applicationDoc._id,
            currentSemester,
            purpose: certificateFor, // This will be 'Other' when a custom reason is provided
            otherReason: certificateFor === 'Other' ? otherReason : undefined
        });
        await bonafide.save();
        console.log('created bonafide doc' , bonafide)

        res.status(201).json({ 
            message: 'Bonafide application submitted successfully',
            applicationId: applicationDoc._id 
        });
    } catch (error) {
        console.error('Error creating bonafide application:', error);
        res.status(500).json({ message: error.message || 'Error submitting bonafide application' });
    }
};

// Get student's bonafide applications
export const getBonafideApplications = async (req, res) => {
    try {
        const studentId = req.params.id;
        
        // Find student
        const student = await Student.findOne({ userId: studentId });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Get all applications
        const applications = await ApplicationDocument.find({ 
            studentId: student._id,
            documentType: 'Bonafide'
        }).sort({ createdAt: -1 });

        // Get bonafide details for each application
        const applicationDetails = await Promise.all(applications.map(async (app) => {
            const bonafide = await Bonafide.findOne({ applicationId: app._id });
            if (!bonafide) return null;
            
            return {
                applicationDate: app.createdAt,
                // Show otherReason as certificateFor when purpose is 'Other'
                certificateFor: bonafide.purpose === 'Other' ? bonafide.otherReason : bonafide.purpose,
                currentStatus: app.status,
                remarks: app.approvalDetails?.remarks || 'No remarks',
                otherDetails: bonafide.otherDetails
            };
        }));

        // Filter out any null values from failed lookups
        console.log('here are all apllications' , applicationDetails)
        const validApplications = applicationDetails.filter(app => app !== null);

        res.status(200).json(validApplications);
    } catch (error) {
        console.error('Error fetching bonafide applications:', error);
        res.status(500).json({ message: 'Error fetching applications' });
    }
};


// Get student's courses
export const getStudentCourses = async (req, res) => {
    const { id } = req.params;

    try {
        const student = await Student.findOne({ userId: id });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Get all courses the student is enrolled in
        const courses = await StudentCourse.find({ rollNo: student.rollNo });
        return res.status(200).json({ courses });
    } catch (err) {
        console.error("Error fetching student courses:", err);
        return res.status(500).json({ message: "Error fetching student courses", error: err });
    }
};

// Get student's assignments
export const getStudentAssignments = async (req, res) => {
    const { id } = req.params;

    try {
        const student = await Student.findOne({ userId: id });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Get all assignments for this student
        const assignments = await Assignment.find({ studentId: student._id });
        return res.status(200).json({ assignments });
    } catch (err) {
        console.error("Error fetching student assignments:", err);
        return res.status(500).json({ message: "Error fetching student assignments", error: err });
    }
};