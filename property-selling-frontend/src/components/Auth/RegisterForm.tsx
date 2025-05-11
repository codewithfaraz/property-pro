import React, { useState } from "react";
import { userActions } from "../../../store/store";
import GetAToast from "../get-a-toast";
import { useDispatch } from "react-redux";
import { apiClient } from "../../../api/api.config";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import supabaseClient from "../../../supabase/supabase";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const addBuyer = async function (data: any) {
  console.log(data);
  const response = await apiClient.post("/add-buyer", data);
  return response;
};
const addDealer = async function (data: any) {
  console.log(data);
  const response = await apiClient.post("/add-dealer", data);
  console.log(response);
  return response;
};
// Define the validation schemas
const buyerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const dealerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    companyName: z
      .string()
      .min(2, "Company name must be at least 2 characters"),
    licenseNumber: z.string().min(3, "License number is required"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    // Document upload is optional in the form but would be handled separately
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type BuyerFormData = z.infer<typeof buyerSchema>;
type DealerFormData = z.infer<typeof dealerSchema>;

type UserType = "buyer" | "dealer";

// Buyer Registration Form Component
const BuyerRegistrationForm: React.FC<{
  isLoading: boolean;

  onSubmit: (data: BuyerFormData) => Promise<void>;
}> = ({ isLoading, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BuyerFormData>({
    resolver: zodResolver(buyerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Full Name
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="your@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password")}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.confirmPassword ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="••••••••"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out flex justify-center items-center"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </div>
    </form>
  );
};

// Dealer Registration Form Component
const DealerRegistrationForm: React.FC<{
  isLoading: boolean;
  onSubmit: (data: DealerFormData) => Promise<void>;
  fileSelected: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ isLoading, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DealerFormData>({
    resolver: zodResolver(dealerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      licenseNumber: "",
      phone: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="dealer-name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Full Name
        </label>
        <input
          id="dealer-name"
          type="text"
          {...register("name")}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="dealer-email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email Address
        </label>
        <input
          id="dealer-email"
          type="email"
          {...register("email")}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="your@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="dealer-password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <input
          id="dealer-password"
          type="password"
          {...register("password")}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="dealer-confirmPassword"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Confirm Password
        </label>
        <input
          id="dealer-confirmPassword"
          type="password"
          {...register("confirmPassword")}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.confirmPassword ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="••••••••"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="companyName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Company Name
        </label>
        <input
          id="companyName"
          type="text"
          {...register("companyName")}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.companyName ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Your Company LLC"
        />
        {errors.companyName && (
          <p className="mt-1 text-sm text-red-600">
            {errors.companyName.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="licenseNumber"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          License Number
        </label>
        <input
          id="licenseNumber"
          type="text"
          {...register("licenseNumber")}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.licenseNumber ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="ABC123456"
        />
        {errors.licenseNumber && (
          <p className="mt-1 text-sm text-red-600">
            {errors.licenseNumber.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          {...register("phone")}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.phone ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="(123) 456-7890"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out flex justify-center items-center"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </div>
    </form>
  );
};

// Main Register Form Component
const RegisterForm = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch();
  const [userType, setUserType] = useState<UserType>("buyer");
  const [isLoading, setIsLoading] = useState(false);
  const [fileSelected, setFileSelected] = useState<File | null>(null);
  const mutateBuyer = useMutation({
    mutationFn: (data: any) => addBuyer(data),
    onSuccess: (res) => {
      console.log(res.data.data.buyer);
      if (res.status === 200) {
        toast.success("Buyer added successfully");
        dispatch(
          userActions.setUser({
            userType: "buyer",
            user: {
              _id: res.data.data.buyer._id,
              fullName: res.data.data.buyer.fullName,
              email: res.data.data.buyer.email,
            },
          })
        );
        onClose();
      }
    },
    onError: () => {
      toast.error("Failed to add buyer");
    },
  });
  const mutateDealer = useMutation({
    mutationFn: (data: any) => addDealer(data),
    onSuccess: (res) => {
      if (res.status === 200) {
        toast.success("Dealer added successfully");
        dispatch(
          userActions.setUser({
            userType: "dealer",
            user: {
              _id: res.data.data.dealer._id,
              fullName: res.data.data.dealer.fullName,
              email: res.data.data.dealer.email,
            },
          })
        );
        console.log("onClose run");
        onClose();
      }
    },
    onError: () => {
      toast.error("Failed to add dealer");
    },
  });
  const handleBuyerSubmit = async (data: BuyerFormData) => {
    setIsLoading(true);
    try {
      // Here you would typically call your registration API
      console.log("Buyer Registration data:", data);
      const { data: registered, error } = await supabaseClient.auth.signUp({
        email: data.email,
        password: data.password,
      });
      if (!error) {
        const response = mutateBuyer.mutate({
          fullName: data.name,
          email: data.email,
        });
        console.log(response);
      }
      if (error) {
        toast.error(error.message);
      }
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDealerSubmit = async (data: DealerFormData) => {
    setIsLoading(true);
    try {
      // Here you would typically call your registration API
      const { data: registered, error } = await supabaseClient.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (!error) {
        console.log(data);
        mutateDealer.mutate({
          fullName: data.name,
          email: data.email,
          companyName: data.companyName,
          licenseNumber: data.licenseNumber,
          phoneNumber: data.phone,
        });
      }
      if (error) {
        toast.error(error.message);
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFileSelected(null);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileSelected(e.target.files[0]);
    }
  };

  return (
    <div className="p-8">
      <GetAToast />
      {/* User Type Tabs */}
      <div className="flex mb-6 border-b">
        <button
          type="button"
          className={`flex-1 py-2 text-center font-medium ${
            userType === "buyer"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setUserType("buyer")}
        >
          Buyer
        </button>
        <button
          type="button"
          className={`flex-1 py-2 text-center font-medium ${
            userType === "dealer"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setUserType("dealer")}
        >
          Dealer
        </button>
      </div>

      {userType === "buyer" ? (
        <BuyerRegistrationForm
          onClose={onClose}
          isLoading={isLoading}
          onSubmit={handleBuyerSubmit}
        />
      ) : (
        <DealerRegistrationForm
          isLoading={isLoading}
          onSubmit={handleDealerSubmit}
          fileSelected={fileSelected}
          onFileChange={handleFileChange}
        />
      )}
    </div>
  );
};

export default RegisterForm;
