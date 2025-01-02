import Project from '../models/Project.js'; // Import the Project model
import path from 'path';

// Add a new project
export const addProject = async (projectData) => {
  console.log("new project heree!!");

    const { projectName, description, techStack, fundingGoal, image } = projectData;

    // Create a new project
    const newProject = new Project({
      projectName,
      description,
      techStack,
      image,
      fundingGoal,
    });

    // Save the project to the database
    await newProject.save();

    return newProject;

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
    console.log(req.params.id)
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
export const updateProject = async (projectData) => {
  try {
    const projectId = projectData.id;
    const { projectName, description, techStack, fundingGoal, image } = projectData;

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { projectName, description, techStack, fundingGoal, image,  },
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

    console.log("Deleting.. ", projectId);
    
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


// Update project details
export const updateProjectAmount = async (req, res) => {
  try {
    const projectId = req.params.id;
    console.log(projectId)

    const project = await Project.findById(projectId);

    project.currentFunding = project.currentFunding + 10;

    project.save()
    
    res.status(200).json({ message: 'Project Amount Updated successfully' });

  } catch (error) {
    console.error('Error in updateProject:', error.message); // Log the error
    res.status(500).json({ message: 'Failed to update project' });
  }
};