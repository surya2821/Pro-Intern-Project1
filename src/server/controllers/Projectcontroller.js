import Project from '../models/Project'; // Import the Project model
import path from 'path';

// Add a new project
export const addProject = async (req, res) => {
  try {
    const { projectName, description, techStack } = req.body;
    const image = req.file ? req.file.path : null; // The image file path from Multer

    // Create a new project
    const newProject = new Project({
      projectName,
      description,
      techStack,
      image,  // Store the image file path
    });

    // Save the project to the database
    await newProject.save();

    res.status(201).json({
      message: 'Project added successfully',
      project: newProject,
    });
  } catch (error) {
    console.error('Error in addProject:', error.message);  // Log the error
    res.status(500).json({ message: 'Failed to add project' });
  }
};

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error in getProjects:', error.message); // Log the error
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
};

// Get a single project by ID
export const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error('Error in getProjectById:', error.message); // Log the error
    res.status(500).json({ message: 'Failed to fetch project' });
  }
};

// Update project details
export const updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { projectName, description, techStack } = req.body;
    const image = req.file ? req.file.path : null;  // Handle image update if present

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { projectName, description, techStack, image },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({
      message: 'Project updated successfully',
      project: updatedProject,
    });
  } catch (error) {
    console.error('Error in updateProject:', error.message); // Log the error
    res.status(500).json({ message: 'Failed to update project' });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    
    const deletedProject = await Project.findByIdAndDelete(projectId);
    
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error in deleteProject:', error.message); // Log the error
    res.status(500).json({ message: 'Failed to delete project' });
  }
};
