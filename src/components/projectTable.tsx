import React, { useState } from 'react';
import { Share2 } from 'lucide-react';

interface Project {
  id: string;
  projectName: string;
  description: string;
  techStack: string;
  startDate: string;
  endDate: string;
  fundAmount: number; // Added fundAmount
}

interface ProjectTableProps {
  projects: Project[];
  onShare: (projectId: string) => void;
}

const ProjectTable: React.FC<ProjectTableProps> = ({ projects, onShare }) => {
  const [sortColumn, setSortColumn] = useState<keyof Project>('projectName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: keyof Project) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedProjects = [...projects].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            {['Project Name', 'Description', 'Tech Stack', 'Start Date', 'End Date', 'Fund Amount', 'Actions'].map(
              (header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() =>
                    handleSort(header.toLowerCase().replace(' ', '') as keyof Project)
                  }
                >
                  {header}
                  {sortColumn === header.toLowerCase().replace(' ', '') && (
                    <span className="ml-1">{sortDirection === 'asc' ? '▲' : '▼'}</span>
                  )}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedProjects.map((project) => (
            <tr key={project.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">{project.projectName}</td>
              <td className="px-6 py-4">{project.description}</td>
              <td className="px-6 py-4">{project.techStack}</td>
              <td className="px-6 py-4 whitespace-nowrap">{project.startDate}</td>
              <td className="px-6 py-4 whitespace-nowrap">{project.endDate}</td>
              <td className="px-6 py-4 whitespace-nowrap">${project.fundAmount}</td> {/* Display fundAmount */}
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => onShare(project.id)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  <Share2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
