import React, { useState } from "react";
import { Button } from "rizzui/button";
import { useDropzone } from "react-dropzone";
// import Modal from "../common/Modal"; // You'll need to create/import a Modal component
import { Modal } from "rizzui/modal";
interface PropertyFormProps {
  isOpen: boolean;
  onClose: () => void;
  isPropertySubmiting: boolean;
  onSubmit: (propertyData: PropertyFormData) => void;
}

interface PropertyFormData {
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: string;
  images: File[];
  video: File | null;
  features: string[];
  amenities: string[];
}

const PropertyForm: React.FC<PropertyFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isPropertySubmiting,
}) => {
  const [formData, setFormData] = useState<PropertyFormData>({
    title: "",
    description: "",
    price: 0,
    location: "",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: "",
    images: [],
    video: null,
    features: [],
    amenities: [],
  });

  const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } =
    useDropzone({
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
      },
      multiple: true,
      onDrop: (acceptedFiles) => {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...acceptedFiles],
        }));
      },
    });

  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps } =
    useDropzone({
      accept: {
        "video/*": [".mp4", ".mov"],
      },
      multiple: false,
      onDrop: (acceptedFiles) => {
        setFormData((prev) => ({
          ...prev,
          video: acceptedFiles[0],
        }));
      },
    });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (
    category: "features" | "amenities",
    value: string
  ) => {
    setFormData((prev) => {
      const currentArray = prev[category];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value];

      return {
        ...prev,
        [category]: newArray,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Here you would typically:
    // 1. Upload images to your storage service (e.g., AWS S3, Firebase Storage)
    // 2. Upload video to your storage service
    // 3. Get the URLs back
    // 4. Submit the form data with the URLs to your API

    onSubmit(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="">
      <form onSubmit={handleSubmit} className="space-y-4 p-12">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="p-2 border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="p-2 border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="p-2 border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="p-2 border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bedrooms
            </label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              className="p-2 border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bathrooms
            </label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              className="p-2 border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Area (sqft)
            </label>
            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="p-2 border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Property Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="p-2 border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select type</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Condo">Condo</option>
            <option value="Land">Land</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Features
            </label>
            <div className="space-y-2">
              {[
                "Garage",
                "Swimming Pool",
                "Garden",
                "Balcony",
                "Fireplace",
                "Security System",
                "Solar Panels",
                "Home Theater",
              ].map((feature) => (
                <div key={feature} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`feature-${feature}`}
                    checked={formData.features.includes(feature)}
                    onChange={() => handleCheckboxChange("features", feature)}
                    className="border h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`feature-${feature}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {feature}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amenities
            </label>
            <div className="space-y-2">
              {[
                "Air Conditioning",
                "Central Heating",
                "High-Speed Internet",
                "Washer/Dryer",
                "Dishwasher",
                "Furnished",
                "Pet Friendly",
                "Gym Access",
              ].map((amenity) => (
                <div key={amenity} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`amenity-${amenity}`}
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleCheckboxChange("amenities", amenity)}
                    className="border h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`amenity-${amenity}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Custom Feature
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                id="custom-feature"
                className="p-2 border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter custom feature"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const input = e.target as HTMLInputElement;
                    if (input.value.trim()) {
                      handleCheckboxChange("features", input.value.trim());
                      input.value = "";
                    }
                  }
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Custom Amenity
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                id="custom-amenity"
                className="p-2 border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter custom amenity"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const input = e.target as HTMLInputElement;
                    if (input.value.trim()) {
                      handleCheckboxChange("amenities", input.value.trim());
                      input.value = "";
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Images
          </label>
          <div
            {...getImageRootProps()}
            className="mt-1 border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer"
          >
            <input {...getImageInputProps()} />
            <p>Drag & drop images here, or click to select files</p>
            {formData.images.length > 0 && (
              <p className="mt-2 text-sm text-gray-600">
                {formData.images.length} files selected
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Video
          </label>
          <div
            {...getVideoRootProps()}
            className="mt-1 border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer"
          >
            <input {...getVideoInputProps()} />
            <p>Drag & drop a video here, or click to select file</p>
            {formData.video && (
              <p className="mt-2 text-sm text-gray-600">
                {formData.video.name}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <Button
            isLoading={isPropertySubmiting}
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Property
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default PropertyForm;
