import React from "react";
import {
  FaBed,
  FaBath,
  FaRuler,
  FaCar,
  FaSwimmingPool,
  FaWifi,
} from "react-icons/fa";
import { MdLocationOn, MdSecurity } from "react-icons/md";

interface PropertyDetailsProps {
  property: {
    title: string;
    price: number;
    address: string;
    type: string;
    area: number;
    bedrooms: number;
    bathrooms: number;
    description: string;
    amenities: string[];
    yearBuilt: number;
    parking: number;
    features: {
      hasPool: boolean;
      hasGarden: boolean;
      hasSecurity: boolean;
      hasInternet: boolean;
    };
  };
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="border-b pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {property.title}
        </h1>
        <div className="flex items-center text-gray-600 mb-4">
          <MdLocationOn className="mr-2" />
          <span>{property.address}</span>
        </div>
        <div className="text-3xl font-bold text-blue-600">
          ${property.price.toLocaleString()}
        </div>
      </div>

      {/* Key Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="flex items-center">
          <FaBed className="text-gray-500 mr-2" />
          <div>
            <div className="text-sm text-gray-500">Bedrooms</div>
            <div className="font-semibold">{property.bedrooms}</div>
          </div>
        </div>
        <div className="flex items-center">
          <FaBath className="text-gray-500 mr-2" />
          <div>
            <div className="text-sm text-gray-500">Bathrooms</div>
            <div className="font-semibold">{property.bathrooms}</div>
          </div>
        </div>
        <div className="flex items-center">
          <FaRuler className="text-gray-500 mr-2" />
          <div>
            <div className="text-sm text-gray-500">Area</div>
            <div className="font-semibold">{property.area} sqft</div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Description</h2>
        <p className="text-gray-600 leading-relaxed">{property.description}</p>
      </div>

      {/* Features & Amenities */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Features & Amenities</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {property.features.hasPool && (
            <div className="flex items-center text-gray-600">
              <FaSwimmingPool className="mr-2" />
              <span>Swimming Pool</span>
            </div>
          )}
          {property.features.hasSecurity && (
            <div className="flex items-center text-gray-600">
              <MdSecurity className="mr-2" />
              <span>24/7 Security</span>
            </div>
          )}
          {property.features.hasInternet && (
            <div className="flex items-center text-gray-600">
              <FaWifi className="mr-2" />
              <span>High-speed Internet</span>
            </div>
          )}
          {property.amenities.map((amenity, index) => (
            <div key={index} className="flex items-center text-gray-600">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
              <span>{amenity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Information */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-600">
          <div>
            <span className="font-medium">Property Type:</span> {property.type}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
