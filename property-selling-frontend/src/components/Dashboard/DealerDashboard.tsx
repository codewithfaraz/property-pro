import React, { useState } from "react";
import { apiClient } from "../../../api/api.config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PropertySkeleton from "../Skeleton/PropertyCardSkeleton";
import { UserState } from "../../../types/userTypes";
import toast from "react-hot-toast";
import GetAToast from "../get-a-toast";
import { FaHome, FaChartBar, FaEnvelope, FaPlus, FaCog } from "react-icons/fa";
import { useSelector } from "react-redux";
import PropertyForm from "../property/PropertyForm";
import PropertyCard from "../Cards/PropertyCard";
import { useNavigate } from "react-router-dom";
import { PropertyType } from "../../../types/userTypes";
const fetchProperties = async (ownerId: string) => {
  const response = await apiClient.get("/get-properties", {
    params: { ownerId: ownerId },
  });
  console.log(response);
  return response.data.data.properties;
};

const DealerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: UserState) => state.user);
  const [issubmiting, setIsSubmiting] = useState(false);
  const [isPropertyFormOpen, setIsPropertyFormOpen] = useState(false);
  const { data } = useQuery({
    queryFn: () => fetchProperties(user?.user._id),
    queryKey: ["properties", user?.user._id],
    enabled: !!user?.user?._id,
  });

  const handleAddProperty = async (propertyData: any) => {
    try {
      setIsSubmiting(true);
      const imagesName = propertyData.images.map((img) => img.name);
      const videoName = propertyData.video ? propertyData.video.name : null;
      let newProperty = {
        ...propertyData,
        images: propertyData.images.length,
        owner: user?.user._id,
        videoName: videoName,
        imagesNames: imagesName,
      };
      newProperty = await apiClient.post("/add-property", newProperty);
      if (newProperty.status != 200) {
        toast.error("Error adding property");
      }
      const uploadedPromises = [];
      if (newProperty.status === 200) {
        const propertyId = newProperty.data.data.property._id;
        const bucketUrl = "https://faraz-learning.s3.eu-north-1.amazonaws.com";

        //images upload

        for (let i = 0; i < propertyData.images.length; i++) {
          const fileKey = `uploads/${propertyId}/images/${propertyData.images[i].name}`;

          const fileUrl = `${bucketUrl}/${fileKey}`;
          const uploadPromise = axios.put(fileUrl, propertyData.images[i], {
            headers: { "Content-Type": propertyData.images[i].type },
          });
          uploadedPromises.push(uploadPromise);
          console.log(`image Uploaded: ${propertyData.images[i].name}`);
        }
        //video upload
        if (propertyData.video) {
          const fileKey = `uploads/${propertyId}/videos/${propertyData.video.name}`;
          const fileUrl = `${bucketUrl}/${fileKey}`;
          const uploadPromise = axios.put(fileUrl, propertyData.video, {
            headers: { "Content-Type": propertyData.video.type },
          });
          uploadedPromises.push(uploadPromise);
          console.log(`video Uploaded: ${propertyData.video.name}`);
        }
        await Promise.all(uploadedPromises);
        toast.success("Property added successfully");
      }
      // Close the modal after successful submission

      setIsSubmiting(false);
      setIsPropertyFormOpen(false);
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  const [activeTab, setActiveTab] = useState("properties");

  const renderContent = () => {
    switch (activeTab) {
      case "properties":
        if (!data) {
          return (
            <div className="flex space-x-4">
              {[1, 2, 3].map((i) => (
                <PropertySkeleton key={i} />
              ))}
            </div>
          );
        }
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((property: PropertyType) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        );
      case "analytics":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Total Listings</h3>
              <p className="text-3xl font-bold text-blue-600">24</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Active Listings</h3>
              <p className="text-3xl font-bold text-green-600">18</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Pending Sales</h3>
              <p className="text-3xl font-bold text-yellow-600">4</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Total Sales</h3>
              <p className="text-3xl font-bold text-purple-600">12</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!(user && user.userType === "dealer")) {
    navigate("/");
  }
  return (
    <div className="flex h-screen bg-gray-100 mt-14">
      {/* Sidebar */}
      <GetAToast />
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">Dealer Dashboard</h2>
        </div>
        <nav className="mt-6">
          <button
            onClick={() => setActiveTab("properties")}
            className={`flex items-center px-6 py-3 w-full ${
              activeTab === "properties"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <FaHome className="mr-3" />
            Properties
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center px-6 py-3 w-full ${
              activeTab === "analytics"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <FaChartBar className="mr-3" />
            Analytics
          </button>
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`flex items-center px-6 py-3 w-full ${
              activeTab === "inquiries"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <FaEnvelope className="mr-3" />
            Inquiries
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center px-6 py-3 w-full ${
              activeTab === "settings"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <FaCog className="mr-3" />
            Settings
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-800">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
            {activeTab === "properties" && (
              <button
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={() => setIsPropertyFormOpen(true)}
              >
                <FaPlus className="mr-2" />
                Add Property
              </button>
            )}
          </div>
          {renderContent()}
        </div>
      </div>
      <PropertyForm
        isPropertySubmiting={issubmiting}
        isOpen={isPropertyFormOpen}
        onClose={() => setIsPropertyFormOpen(false)}
        onSubmit={handleAddProperty}
      />
    </div>
  );
};

export default DealerDashboard;
