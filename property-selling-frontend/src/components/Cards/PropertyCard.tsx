import React from "react";
import { FaBed, FaBath, FaRuler } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    imageUrl: string;
    videoUrl?: string; // Add optional video URL
    bedrooms: number;
    bathrooms: number;
    area: number;
    type: string;
    createdAt: string;
    videoName: string | null;
    _id: string;
  };
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/properties/${property.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
    >
      <div className="relative">
        {property.videoName ? (
          <video
            src={`https://faraz-learning.s3.eu-north-1.amazonaws.com/uploads/${property._id}/videos/${property.videoName}`}
            className="w-full h-48 object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
          {property.type}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MdLocationOn className="mr-1" />
          {property.location}
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {property.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {property.description}
        </p>

        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4 text-gray-600">
            <div className="flex items-center">
              <FaBed className="mr-2" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center">
              <FaBath className="mr-2" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center">
              <FaRuler className="mr-2" />
              <span>{property.area} sqft</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">
            ${property.price.toLocaleString()}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click when clicking the button
              navigate(`/properties/${property._id}`);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
