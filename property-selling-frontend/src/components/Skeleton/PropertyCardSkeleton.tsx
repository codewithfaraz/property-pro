import React from "react";

const PropertySkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image skeleton */}
      <div className="relative">
        <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
        <div className="absolute top-4 right-4 bg-gray-300 w-16 h-6 rounded-full animate-pulse"></div>
      </div>

      <div className="p-4">
        {/* Location skeleton */}
        <div className="flex items-center mb-2">
          <div className="w-4 h-4 bg-gray-200 rounded-full mr-1 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
        </div>

        {/* Title skeleton */}
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>

        {/* Description skeleton */}
        <div className="h-4 bg-gray-200 rounded w-full mb-1 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-4 animate-pulse"></div>

        {/* Property details skeleton */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-200 rounded mr-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-4 animate-pulse"></div>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-200 rounded mr-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-4 animate-pulse"></div>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-200 rounded mr-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-14 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Price and button skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
          <div className="h-10 bg-gray-300 rounded-md w-28 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default PropertySkeleton;
