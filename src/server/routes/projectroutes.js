import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { addProject, getProjects, getProjectById, updateProject, deleteProject, updateProjectAmount } from '../controllers/Projectcontroller.js';

const router = express.Router();

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dswrgvg3c', // Replace with your Cloudinary cloud name
  api_key: '945953852319697',       // Replace with your Cloudinary API key
  api_secret: 'fXLqAXev67XBvIzf9IN8wy5y-NA', // Replace with your Cloudinary API secret
});

// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'project_images', // Cloudinary folder to store images
    allowed_formats: ['jpg', 'jpeg', 'png'], // Accepted image formats
  },
});

const upload = multer({ storage });

// Add a new project with Cloudinary upload
router.post('/projects', upload.single('image'), async (req, res) => {
  try {
    console.log("here")
    if (!req.file) {
      return res.status(400).json({ message: 'Image upload failed or no image provided' });
    }

    const imageUrl = req.file.path; // Cloudinary stores the uploaded image URL in `req.file.path`
    const projectData = { ...req.body, image: imageUrl };

    console.log("image url ", projectData.image)

    const result = await addProject(projectData); // Pass project data to your controller
    res.status(201).json({ message: 'Project added successfully!', project: result });
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ message: 'Failed to add project', error: error.message });
  }
});


// Get all projects
router.get('/projects', getProjects);

// Get a single project by ID
router.get('/projects/:id', getProjectById);

// Update a project
router.put('/projects/:id', upload.single('image'), async (req, res) => {
  try {
    console.log("here for update")

    if (!req.file) {
    const imageUrl = req.file.path; // Cloudinary stores the uploaded image URL in `req.file.path`
    const projectData = { ...req.body, image: imageUrl };
    }
    
    console.log("image url ", projectData.image)

    const result = await updateProject(projectData); // Pass project data to your controller
    res.status(201).json({ message: 'Project updated successfully!', project: result });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Failed to update project', error: error.message });
  }
});

// Delete a project
router.delete('/projects/:id', deleteProject);

router.put('/projects/amount/:id', updateProjectAmount);


export default router;
