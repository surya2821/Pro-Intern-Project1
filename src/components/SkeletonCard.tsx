import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-gray-200 animate-pulse">
      <div className="h-6 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
};

export default SkeletonCard;
