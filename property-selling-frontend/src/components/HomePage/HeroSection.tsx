import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "rizzui";
// import FilteredProperties from "../property/filteredProperties";
export default function HeroSection() {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 h-[600px] flex items-center w-full">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
      <div className="p-4">
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="p-4"
        >
          <h1>filtered properties here</h1>
        </Modal>
      </div>
      <div className="container z-10 relative">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-5xl font-bold mb-6">
            Find Your Dream Property Today
          </h1>
          <p className="text-xl mb-8">
            Discover thousands of properties for sale and rent across the
            country
          </p>

          {/* Search Bar */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label
                  htmlFor="location"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  Location
                </label>
                <select
                  id="location"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="">Any Location</option>
                  <option value="new-york">New York</option>
                  <option value="los-angeles">Los Angeles</option>
                  <option value="chicago">Chicago</option>
                  <option value="miami">Miami</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="property-type"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  Property Type
                </label>
                <select
                  id="property-type"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option value="">Any Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="condo">Condo</option>
                  <option value="villa">Villa</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="price-range"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  Price Range
                </label>
                <select
                  id="price-range"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  <option value="">Any Price</option>
                  <option value="0-100000">$0 - $100,000</option>
                  <option value="100000-300000">$100,000 - $300,000</option>
                  <option value="300000-500000">$300,000 - $500,000</option>
                  <option value="500000-1000000">$500,000 - $1,000,000</option>
                  <option value="1000000+">$1,000,000+</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out"
                  onClick={() => setIsModalOpen(true)}
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            {!user && (
              <button className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-md transition duration-300 ease-in-out">
                Register
              </button>
            )}
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-medium py-3 px-6 rounded-md transition duration-300 ease-in-out">
              Browse Listings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
