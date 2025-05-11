// import React, { useState } from "react";
// import DashboardLayout from "./DashboardLayout";

// // Mock data for saved properties
// const savedProperties = [
//   {
//     id: "1",
//     title: "Modern Apartment in Downtown",
//     address: "123 Main St, New York, NY 10001",
//     price: "$450,000",
//     bedrooms: 2,
//     bathrooms: 2,
//     area: "1,200 sqft",
//     image:
//       "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
//     saved: true,
//   },
//   {
//     id: "2",
//     title: "Luxury Villa with Pool",
//     address: "456 Ocean Ave, Miami, FL 33139",
//     price: "$1,250,000",
//     bedrooms: 4,
//     bathrooms: 3,
//     area: "3,500 sqft",
//     image:
//       "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
//     saved: true,
//   },
//   {
//     id: "3",
//     title: "Cozy Suburban Home",
//     address: "789 Maple Rd, Chicago, IL 60007",
//     price: "$350,000",
//     bedrooms: 3,
//     bathrooms: 2,
//     area: "1,800 sqft",
//     image:
//       "https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
//     saved: true,
//   },
// ];

// // Mock data for inquiries and messages
// const inquiries = [
//   {
//     id: "1",
//     propertyTitle: "Modern Apartment in Downtown",
//     propertyId: "1",
//     dealer: "John Smith",
//     dealerId: "dealer1",
//     lastMessage: "Is this property still available?",
//     date: "2023-06-15T14:30:00",
//     unread: true,
//   },
//   {
//     id: "2",
//     propertyTitle: "Luxury Villa with Pool",
//     propertyId: "2",
//     dealer: "Sarah Johnson",
//     dealerId: "dealer2",
//     lastMessage:
//       "Thank you for your interest. Yes, we can schedule a viewing for next week.",
//     date: "2023-06-14T09:15:00",
//     unread: false,
//   },
// ];

// // Mock user profile data
// const userProfile = {
//   name: "Alex Johnson",
//   email: "alex.johnson@example.com",
//   phone: "(555) 123-4567",
//   address: "123 Main St, Apt 4B, New York, NY 10001",
//   preferences: {
//     propertyTypes: ["Apartment", "House"],
//     priceRange: "$200,000 - $500,000",
//     locations: ["New York, NY", "Brooklyn, NY"],
//     notifications: {
//       email: true,
//       sms: false,
//       app: true,
//     },
//   },
// };

// const BuyerDashboard: React.FC = () => {
//   const [activeSection, setActiveSection] = useState("saved");
//   const [removedPropertyIds, setRemovedPropertyIds] = useState<string[]>([]);

//   const handleRemoveProperty = (id: string) => {
//     setRemovedPropertyIds([...removedPropertyIds, id]);
//   };

//   const filteredProperties = savedProperties.filter(
//     (property) => !removedPropertyIds.includes(property.id)
//   );

//   // Saved Properties Section
//   const SavedPropertiesSection = () => (
//     <div>
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">
//         Saved Properties
//       </h2>

//       {filteredProperties.length === 0 ? (
//         <div className="bg-white rounded-lg shadow p-6 text-center">
//           <svg
//             className="w-16 h-16 text-gray-400 mx-auto mb-4"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//             ></path>
//           </svg>
//           <h3 className="text-lg font-medium text-gray-900 mb-2">
//             No saved properties
//           </h3>
//           <p className="text-gray-500">
//             You haven't saved any properties yet. Browse listings and click the
//             heart icon to save properties you're interested in.
//           </p>
//           <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
//             Browse Properties
//           </button>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredProperties.map((property) => (
//             <div
//               key={property.id}
//               className="bg-white rounded-lg shadow overflow-hidden"
//             >
//               <div className="relative">
//                 <img
//                   src={property.image}
//                   alt={property.title}
//                   className="w-full h-48 object-cover"
//                 />
//                 <button
//                   className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-100"
//                   onClick={() => handleRemoveProperty(property.id)}
//                 >
//                   <svg
//                     className="w-5 h-5 text-red-500"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                       clipRule="evenodd"
//                     ></path>
//                   </svg>
//                 </button>
//               </div>
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-1">
//                   {property.title}
//                 </h3>
//                 <p className="text-gray-600 text-sm mb-2">{property.address}</p>
//                 <p className="text-blue-600 font-bold text-lg mb-3">
//                   {property.price}
//                 </p>
//                 <div className="flex justify-between text-sm text-gray-500">
//                   <span>{property.bedrooms} Beds</span>
//                   <span>{property.bathrooms} Baths</span>
//                   <span>{property.area}</span>
//                 </div>
//                 <div className="mt-4 flex space-x-2">
//                   <button className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
//                     View Details
//                   </button>
//                   <button className="flex-1 bg-white border border-blue-600 text-blue-600 py-2 rounded-md hover:bg-blue-50 transition duration-300">
//                     Contact Dealer
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   // Inquiries & Messages Section
//   const InquiriesSection = () => (
//     <div>
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">
//         Inquiries & Messages
//       </h2>

//       {inquiries.length === 0 ? (
//         <div className="bg-white rounded-lg shadow p-6 text-center">
//           <svg
//             className="w-16 h-16 text-gray-400 mx-auto mb-4"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
//             ></path>
//           </svg>
//           <h3 className="text-lg font-medium text-gray-900 mb-2">
//             No inquiries yet
//           </h3>
//           <p className="text-gray-500">
//             You haven't made any inquiries about properties. Contact dealers to
//             ask questions or schedule viewings.
//           </p>
//           <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
//             Browse Properties
//           </button>
//         </div>
//       ) : (
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           <div className="divide-y divide-gray-200">
//             {inquiries.map((inquiry) => (
//               <div
//                 key={inquiry.id}
//                 className={`p-4 hover:bg-gray-50 transition duration-150 ${
//                   inquiry.unread ? "border-l-4 border-blue-500" : ""
//                 }`}
//               >
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="text-lg font-medium text-gray-900">
//                       {inquiry.propertyTitle}
//                     </h3>
//                     <p className="text-sm text-gray-600 mt-1">
//                       Dealer: {inquiry.dealer}
//                     </p>
//                   </div>
//                   <span className="text-sm text-gray-500">
//                     {new Date(inquiry.date).toLocaleDateString()}
//                   </span>
//                 </div>
//                 <p className="mt-2 text-gray-700">{inquiry.lastMessage}</p>
//                 <div className="mt-3 flex justify-end space-x-2">
//                   <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
//                     View Property
//                   </button>
//                   <button className="px-3 py-1 bg-blue-600 rounded-md text-sm text-white hover:bg-blue-700">
//                     Reply
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   // Profile & Settings Section
//   const ProfileSection = () => (
//     <div>
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">
//         Profile & Settings
//       </h2>

//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <div className="p-6">
//           <div className="flex items-center space-x-4 mb-6">
//             <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
//               {userProfile.name.charAt(0)}
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold text-gray-900">
//                 {userProfile.name}
//               </h3>
//               <p className="text-gray-600">{userProfile.email}</p>
//             </div>
//             <button className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
//               Edit Profile
//             </button>
//           </div>

//           <div className="border-t border-gray-200 pt-6">
//             <h4 className="text-lg font-medium text-gray-900 mb-4">
//               Personal Information
//             </h4>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   value={userProfile.name}
//                   readOnly
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   value={userProfile.email}
//                   readOnly
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   value={userProfile.phone}
//                   readOnly
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Address
//                 </label>
//                 <input
//                   type="text"
//                   value={userProfile.address}
//                   readOnly
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="border-t border-gray-200 pt-6 mt-6">
//             <h4 className="text-lg font-medium text-gray-900 mb-4">
//               Preferences
//             </h4>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Property Types
//                 </label>
//                 <div className="flex flex-wrap gap-2">
//                   {userProfile.preferences.propertyTypes.map((type) => (
//                     <span
//                       key={type}
//                       className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
//                     >
//                       {type}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Price Range
//                 </label>
//                 <span className="text-gray-900">
//                   {userProfile.preferences.priceRange}
//                 </span>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Preferred Locations
//                 </label>
//                 <div className="flex flex-wrap gap-2">
//                   {userProfile.preferences.locations.map((location) => (
//                     <span
//                       key={location}
//                       className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
//                     >
//                       {location}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="border-t border-gray-200 pt-6 mt-6">
//             <h4 className="text-lg font-medium text-gray-900 mb-4">
//               Notification Settings
//             </h4>
//             <div className="space-y-3">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h5 className="font-medium text-gray-900">
//                     Email Notifications
//                   </h5>
//                   <p className="text-sm text-gray-500">
//                     Receive updates and alerts via email
//                   </p>
//                 </div>
//                 <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
//                   <input
//                     type="checkbox"
//                     id="email-notifications"
//                     className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border-2 rounded-full appearance-none cursor-pointer peer border-gray-300 checked:right-0 checked:border-blue-600 peer-checked:bg-blue-600"
//                     checked={userProfile.preferences.notifications.email}
//                     readOnly
//                   />
//                   <label
//                     htmlFor="email-notifications"
//                     className="block w-full h-full overflow-hidden rounded-full cursor-pointer bg-gray-300 peer-checked:bg-blue-600"
//                   ></label>
//                 </div>
//               </div>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h5 className="font-medium text-gray-900">
//                     SMS Notifications
//                   </h5>
//                   <p className="text-sm text-gray-500">
//                     Receive updates and alerts via text message
//                   </p>
//                 </div>
//                 <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
//                   <input
//                     type="checkbox"
//                     id="sms-notifications"
//                     className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border-2 rounded-full appearance-none cursor-pointer peer border-gray-300 checked:right-0 checked:border-blue-600 peer-checked:bg-blue-600"
//                     checked={userProfile.preferences.notifications.sms}
//                     readOnly
//                   />
//                   <label
//                     htmlFor="sms-notifications"
//                     className="block w-full h-full overflow-hidden rounded-full cursor-pointer bg-gray-300 peer-checked:bg-blue-600"
//                   ></label>
//                 </div>
//               </div>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h5 className="font-medium text-gray-900">
//                     App Notifications
//                   </h5>
//                   <p className="text-sm text-gray-500">
//                     Receive in-app notifications and alerts
//                   </p>
//                 </div>
//                 <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
//                   <input
//                     type="checkbox"
//                     id="app-notifications"
//                     className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border-2 rounded-full appearance-none cursor-pointer peer border-gray-300 checked:right-0 checked:border-blue-600 peer-checked:bg-blue-600"
//                     checked={userProfile.preferences.notifications.app}
//                     readOnly
//                   />
//                   <label
//                     htmlFor="app-notifications"
//                     className="block w-full h-full overflow-hidden rounded-full cursor-pointer bg-gray-300 peer-checked:bg-blue-600"
//                   ></label>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="mt-6 flex justify-end">
//             <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
//               Save Changes
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <DashboardLayout
//       userType="buyer"
//       activeSection={activeSection}
//       onSectionChange={setActiveSection}
//     >
//       {activeSection === "saved" && <SavedPropertiesSection />}
//       {activeSection === "inquiries" && <InquiriesSection />}
//       {activeSection === "profile" && <ProfileSection />}
//     </DashboardLayout>
//   );
// };

// export default BuyerDashboard;
