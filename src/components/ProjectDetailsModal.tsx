import React from "react";

interface ProjectCardProps {
  project: {
    id: string;
    projectName: string;
    description: string;
    techStack: string;
    startDate: string;
    endDate: string;
    fundAmount: number;
  };
  onShare: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onShare }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h3 className="text-lg font-semibold">{project.projectName}</h3>
      <p>{project.description}</p>
      <p className="text-sm text-gray-500">{project.techStack}</p>
      <div className="flex justify-between mt-4">
        <span>Start Date: {project.startDate}</span>
        <span>End Date: {project.endDate}</span>
        <span>Fund: {project.fundAmount}</span> {/* Display fundAmount */}
      </div>
    </div>
  );
};

export default ProjectCard;
