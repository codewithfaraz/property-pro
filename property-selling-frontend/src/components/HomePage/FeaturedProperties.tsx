import React from "react";
import PropertyCard from "../Cards/PropertyCard";
import { apiClient } from "../../../api/api.config";
import { useQuery } from "@tanstack/react-query";
import PropertySkeleton from "../Skeleton/PropertyCardSkeleton";
const fetchProperties = async () => {
  const response = await apiClient.get("/get-featured-properties");
  return response.data;
};
const mockFeaturedProperties = [
  {
    id: "1",
    title: "Luxury Waterfront Villa",
    description:
      "Beautiful modern villa with stunning ocean views and high-end finishes.",
    price: 1250000,
    location: "Miami Beach, FL",
    imageUrl: "https://placehold.co/600x400",
    bedrooms: 4,
    bathrooms: 3,
    area: 4500,
    type: "Villa",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Modern Downtown Apartment",
    description:
      "Stylish apartment in the heart of the city with amazing amenities.",
    price: 750000,
    location: "New York, NY",
    imageUrl: "https://placehold.co/600x400",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    type: "Apartment",
    createdAt: "2024-01-20",
  },
  {
    id: "3",
    title: "Cozy Suburban House",
    description:
      "Family-friendly home with a large backyard and modern updates.",
    price: 550000,
    location: "Los Angeles, CA",
    imageUrl: "https://placehold.co/600x400",
    bedrooms: 3,
    bathrooms: 2.5,
    area: 2200,
    type: "House",
    createdAt: "2024-01-25",
  },
];

const FeaturedProperties: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["featured-properties"],
    queryFn: fetchProperties,
  });
  if (data) {
    console.log(data.data.properties);
  }
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our hand-picked selection of premium properties. Each one
            represents the finest in luxury, comfort, and value.
          </p>
        </div>
        {data ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.data.properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          [1, 2, 3].map((index) => <PropertySkeleton key={index} />)
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;
