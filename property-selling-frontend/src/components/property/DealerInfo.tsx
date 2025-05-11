import React from "react";
import { FaPhone, FaEnvelope, FaUser, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

interface DealerInfoProps {
  dealer: {
    id: string;
    name: string;
    photo: string;
    phone: string;
    email: string;
    rating: number;
    totalListings: number;
    experience: number;
    bio: string;
  };
}

const DealerInfo: React.FC<DealerInfoProps> = ({ dealer }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start space-x-4">
        {/* Dealer Photo */}
        <div className="flex-shrink-0">
          <img
            src={dealer.photo}
            alt={dealer.name}
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>

        {/* Dealer Details */}
        <div className="flex-grow">
          <h2 className="text-xl font-semibold mb-2">{dealer.name}</h2>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={
                    index < dealer.rating ? "text-yellow-400" : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {dealer.rating.toFixed(1)}
            </span>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <span className="text-gray-500">Total Listings:</span>
              <span className="ml-2 font-semibold">{dealer.totalListings}</span>
            </div>
            <div>
              <span className="text-gray-500">Experience:</span>
              <span className="ml-2 font-semibold">
                {dealer.experience} years
              </span>
            </div>
          </div>

          {/* Bio */}
          <p className="text-gray-600 text-sm mb-4">{dealer.bio}</p>

          {/* Contact Buttons */}
          <div className="flex flex-col space-y-2">
            <a
              href={`tel:${dealer.phone}`}
              className="flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              <FaPhone className="mr-2" />
              Call Dealer
            </a>
            <a
              href={`mailto:${dealer.email}`}
              className="flex items-center justify-center bg-white text-blue-600 border border-blue-600 py-2 px-4 rounded-md hover:bg-blue-50 transition duration-300"
            >
              <FaEnvelope className="mr-2" />
              Email Dealer
            </a>
            <Link
              to={`/dealer/${dealer.id}`}
              className="flex items-center justify-center bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition duration-300"
            >
              <FaUser className="mr-2" />
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealerInfo;
