import React from 'react';
import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';

interface Project {
  id: string;
  projectName: string;
  description: string;
  techStack: string;
  startDate: string;
  endDate: string;
  image: string; // Ensure imageUrl is correctly passed and accessible
}

interface ProjectCardProps {
  project: Project;
  onShare: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onShare }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Container */}
      <div className="h-40 bg-gray-200">
        {/* Adding fallback in case the image fails to load */}
        <img
          src={project.image}
          alt={project.projectName}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/300"; // Placeholder image
          }}
        />
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {project.projectName}
        </h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{project.techStack}</span>
          <button
            onClick={() => onShare(project.id)}
            className="text-indigo-600 hover:text-indigo-900"
          >
            <Share2 size={20} />
          </button>
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-4">
        <div className="text-sm text-gray-500">
          <span>{project.startDate}</span> - <span>{project.endDate}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
