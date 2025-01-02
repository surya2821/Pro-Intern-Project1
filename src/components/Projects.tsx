import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, List, Grid, Trash, Share2 } from 'lucide-react';
import AddProjectModal from '../components/AddProjectModal';
import ProjectCard from './ProjectCard';
import ProjectTable from './projectTable';
import EditProjectModal from './EditProjectModal';

interface Project {
  _id: string;
  projectName: string;
  description: string;
  techStack: string;
  startDate: string;
  endDate: string;
  fundAmount: number;
  imageUrl: string; // Add imageUrl to the Project interface
}

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch projects from API on page load
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data); // Set the fetched data
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false); // Hide loading state after the request is complete
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.techStack.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProject = (newProject: Project) => {
    const updatedProjects = [...projects, { ...newProject, id: Date.now().toString() }];
    setProjects(updatedProjects);
  };

  const handleShare = (projectId: string) => {
    const projectURL = `${window.location.origin}/projects/${projectId}`;
    // Open the project URL in a new tab
    window.open(projectURL, '_blank');
  };

  const handleDelete = async (projectId: string) => {
    if (!projectId) {
      console.error('Invalid project ID');
      alert('Cannot delete project: Invalid project ID');
      return;
    }

    console.log("Deleting project from client side: " + projectId);

    try {
      // Send DELETE request to the server
      const response = await fetch(`http://localhost:5000/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the project');
      }

      // Update the projects state locally by filtering out the deleted project
      setProjects((prevProjects) => prevProjects.filter((project) => project._id !== projectId));

      // Show a success message
      alert('Project deleted successfully!');
    } catch (err) {
      console.error('Error deleting project:', err);
      alert('Failed to delete project. Please try again.');
    }
  };

  const handleProjectUpdated = (updatedProject: Project) => {
    const updatedProjects = projects.map((project) =>
      project._id === updatedProject._id ? updatedProject : project
    );
    setProjects(updatedProjects);
  };

  if (loading) {
    return <div>Loading projects...</div>; // Show loading message
  }

  if (error) {
    return <div>{error}</div>; // Show error message
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Project Showcase</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'table' : 'grid')}
              className="bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition duration-300"
            >
              {viewMode === 'grid' ? <List size={20} /> : <Grid size={20} />}
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition duration-300 flex items-center"
            >
              <Plus className="mr-2" size={16} />
              Add Project
            </button>
          </div>
        </div>
      </header>

      {/* New Text Header */}
      <div className="bg-indigo-600 text-white text-center py-4">
        <h2 className="text-lg font-semibold">Click the share button to raise funds for your project!</h2>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Search Bar */}
          <div className="mb-6 flex justify-center">
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          {/* Project List */}
          <AnimatePresence>
            {filteredProjects.length === 0 ? (
              <div className="text-gray-500 text-center">No projects to display. Add one to get started!</div>
            ) : viewMode === 'grid' ? (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project._id}
                    className="p-4 bg-white shadow-md rounded-md flex flex-col justify-between space-y-4"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <ProjectCard project={project} />
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleShare(project._id)}
                        className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition"
                      >
                        <Share2 className="inline-block mr-2" size={16} />
                        Share
                      </button>
                      <button
                        onClick={() => handleDelete(project._id)}
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition"
                      >
                        <Trash className="inline-block mr-2" size={16} />
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <ProjectTable projects={filteredProjects} />
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Add Project Modal */}
      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onProjectAdded={handleAddProject}
      />

      {/* Edit Project Modal */}
      <EditProjectModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        project={currentProject}
        projectID={currentProject ? currentProject._id : null}
        onProjectUpdated={handleProjectUpdated}
      />
    </div>
  );
};

export default ProjectsPage;
