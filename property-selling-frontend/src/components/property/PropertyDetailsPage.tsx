import React from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "./ImageGallery";
import PropertyDetails from "./PropertyDetails";
import DealerInfo from "./DealerInfo";
import InquiryForm from "./InquiaryForm";
import { apiClient } from "../../../api/api.config";
import { useQuery } from "@tanstack/react-query";
const fetchProperty = async (propertyId: string | null) => {
  const response = await apiClient.get(`/get-property`, {
    params: { id: propertyId },
  });
  return response.data;
};
// Mock data - Replace with actual API calls
const mockProperty = {
  id: "1",
  title: "Luxury Waterfront Villa",
  price: 1250000,
  address: "123 Ocean Drive, Miami Beach, FL 33139",
  type: "Villa",
  area: 4500,
  bedrooms: 4,
  bathrooms: 3.5,
  description: `This stunning waterfront villa offers the perfect blend of luxury and comfort. 
    Featuring breathtaking ocean views from every room, this property boasts high-end finishes, 
    a gourmet kitchen, and expansive outdoor living spaces. The master suite includes a private 
    balcony and spa-like bathroom. Additional amenities include a private pool, three-car garage, 
    and smart home technology throughout.`,
  amenities: [
    "Gourmet Kitchen",
    "Smart Home System",
    "Wine Cellar",
    "Home Theater",
    "Gym",
    "Outdoor Kitchen",
  ],
  yearBuilt: 2020,
  parking: 3,
  features: {
    hasPool: true,
    hasGarden: true,
    hasSecurity: true,
    hasInternet: true,
  },
  images: [
    "https://placehold.co/1200x800",
    "https://placehold.co/1200x800",
    "https://placehold.co/1200x800",
    "https://placehold.co/1200x800",
    "https://placehold.co/1200x800",
    "https://placehold.co/1200x800",
  ],
  videoUrl: "https://example.com/video.mp4",
};

const mockDealer = {
  id: "101",
  name: "Sarah Johnson",
  photo: "https://placehold.co/400x400",
  phone: "+1 (555) 123-4567",
  email: "sarah.johnson@example.com",
  rating: 4.8,
  totalListings: 45,
  experience: 8,
  bio: "Luxury real estate specialist with over 8 years of experience in the Miami market. Known for exceptional service and attention to detail.",
};

const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const handleInquirySubmit = async (data: any) => {
    // Handle inquiry submission
    console.log("Inquiry submitted:", data);
  };
  const { data } = useQuery({
    queryFn: () => fetchProperty(id),
    queryKey: ["property", id],
    enabled: !!id,
  });
  if (data) {
    console.log(data.data.property);
    console.log(data.data.property.videoName);
  }
  return (
    <div>
      {data ? (
        <div className="min-h-screen bg-gray-100 py-8 mt-14">
          <div className="container mx-auto px-4">
            {/* Image Gallery */}
            <div className="mb-8">
              <ImageGallery
                images={data.data.property.imagesNames.map((img: string) => {
                  return `https://faraz-learning.s3.eu-north-1.amazonaws.com/uploads/${data.data.property._id}/images/${img}`;
                })}
                videoUrl={`https://faraz-learning.s3.eu-north-1.amazonaws.com/uploads/${data.data.property._id}/videos/${data.data.property.videoName}`}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Property Details */}
                <PropertyDetails property={data.data.property} />

                {/* Location */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">Location</h2>
                  <div className="h-[400px] bg-gray-200 rounded-lg">
                    {/* Add your map component here */}
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      Map will be displayed here
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Dealer Information */}
                <DealerInfo dealer={mockDealer} />

                {/* Inquiry Form */}
                <InquiryForm
                  propertyId={id || ""}
                  onSubmit={handleInquirySubmit}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default PropertyDetailsPage;
