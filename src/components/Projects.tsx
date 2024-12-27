import React, { useState, useEffect } from 'react';
import axios from 'axios';


const AddProject: React.FC = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    techStack: "",
    image: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const projectData = new FormData();
    projectData.append("projectName", formData.projectName);
    projectData.append("description", formData.description);
    projectData.append("techStack", formData.techStack);
    if (formData.image) projectData.append("image", formData.image);

    try {
      const response = await axios.post("http://localhost:5000/api/projects", projectData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Project added successfully!");
      setFormData({ projectName: "", description: "", techStack: "", image: null });
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Failed to add project");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Add a New Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="projectName" className="block text-gray-700">Project Name</label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Enter project name"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Enter project description"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="techStack" className="block text-gray-700">Tech Stack</label>
          <input
            type="text"
            id="techStack"
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Enter tech stack"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700">Project Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Add Project
          </button>
        </div>
      </form>
    </div>
  );
};

// Project Card to display a single project (ProjectCard.tsx)
const ProjectCard: React.FC<{ project: any }> = ({ project }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-5 w-80 m-4">
      <img
        src={`http://localhost:5000/${project.image}`}
        alt={project.projectName}
        className="w-full h-40 object-cover rounded-md"
      />
      <h3 className="text-xl font-bold mt-3">{project.projectName}</h3>
      <p className="text-gray-600 mt-2">{project.description}</p>
      <p className="text-sm text-indigo-600 mt-2">Tech Stack: {project.techStack}</p>
    </div>
  );
};

// Fetch and display all projects (ProjectList.tsx)
const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="flex flex-wrap justify-center mt-10">
      {projects.map((project: any) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
};

// Main Page that combines both AddProject and ProjectList
const ProjectsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AddProject />
      <ProjectList />
    </div>
  );
};

export default ProjectsPage;
