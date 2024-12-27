import express from 'express';
import multer from 'multer';
import { addProject, getProjects, getProjectById, updateProject, deleteProject } from '../controllers/Projectcontroller';

const router = express.Router();

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Store images in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Create a unique filename
  }
});

const upload = multer({ storage: storage });

// Add a new project
router.post('/projects', upload.single('image'), addProject);

// Get all projects
router.get('/projects', getProjects);

// Get a single project by ID
router.get('/projects/:id', getProjectById);

// Update a project
router.put('/projects/:id', upload.single('image'), updateProject);

// Delete a project
router.delete('/projects/:id', deleteProject);

export default router;
