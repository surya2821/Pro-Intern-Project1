import React, { useState, useEffect } from 'react';

interface Project {
  _id: string;
  projectName: string;
  description: string;
  techStack: string;
  startDate: string;
  endDate: string;
  fundAmount: number;
  imageUrl: string;
}

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  onProjectUpdated: (updatedProject: Project) => void;
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({
  isOpen,
  onClose,
  project,
  onProjectUpdated,
}) => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [techStack, setTechStack] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [fundAmount, setFundAmount] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (project) {
      setProjectName(project.projectName);
      setDescription(project.description);
      setTechStack(project.techStack);
      setStartDate(project.startDate);
      setEndDate(project.endDate);
      setFundAmount(project.fundAmount);
      setImageUrl(project.imageUrl);
    }
  }, [project]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (project) {
      const formData = new FormData();
      formData.append('projectName', projectName);
      formData.append('description', description);
      formData.append('techStack', techStack);
      formData.append('startDate', startDate);
      formData.append('endDate', endDate);
      formData.append('fundAmount', fundAmount.toString());
      if (image) {
        formData.append('image', image);
      }

      try {
        const response = await fetch(`http://localhost:5000/api/projects/${project._id}`, {
          method: 'PUT',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to update project');
        }

        const updatedProject = await response.json();
        onProjectUpdated(updatedProject);
        onClose();
      } catch (error) {
        console.error('Error updating project:', error);
      }
    }
  };

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">Project Name</label>
            <input
              type="text"
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows={3}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="techStack" className="block text-sm font-medium text-gray-700">Tech Stack</label>
            <input
              type="text"
              id="techStack"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="fundAmount" className="block text-sm font-medium text-gray-700">Fund Amount (₹)</label>
            <input
              type="number"
              id="fundAmount"
              value={fundAmount}
              onChange={(e) => setFundAmount(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Project Image</label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="mt-1 block w-full"
              accept="image/*"
            />
            {imageUrl && (
              <img src={imageUrl} alt="Project Preview" className="mt-2 w-full h-40 object-cover rounded-md" />
            )}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProjectModal;

