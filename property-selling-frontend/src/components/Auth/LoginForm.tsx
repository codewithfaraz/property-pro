import { useState } from "react";
import supabaseClient from "../../../supabase/supabase";
import { useDispatch } from "react-redux";
import { userActions } from "../../../store/store";
import GetAToast from "../get-a-toast";
import toast from "react-hot-toast";
import { apiClient } from "../../../api/api.config";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // Here you would typically call your authentication API
      console.log("Login data:", data);
      const { data: loginData, error } =
        await supabaseClient.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
      if (error) {
        toast.error(error.message);
      } else {
        console.log("Login data:", loginData.user.email);
        const user = await apiClient.get("/get-user", {
          params: {
            email: loginData.user.email,
          },
        });
        if (user.status === 200) {
          if (user.data.userType === "dealer") {
            dispatch(
              userActions.setUser({
                user: {
                  _id: user.data.user.user._id,
                  fullName: user.data.user.user.fullName,
                  email: user.data.user.user.email,
                  companyName: user.data.user.user.companyName,
                  licenseNumber: user.data.user.user.licenseNumber,
                  phoneNumber: user.data.user.user.phoneNumber,
                },
                userType: user.data.userType,
              })
            );
          } else if (user.data.userType === "buyer") {
            dispatch(
              userActions.setUser({
                user: {
                  _id: user.data.user.user._id,
                  fullName: user.data.user.user.fullName,
                  email: user.data.user.user.email,
                },
                userType: user.data.userType,
              })
            );
          }
        }
        toast.success("Login successfull");
      }
      onClose();
      // Simulate API call
      reset();
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <GetAToast />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
          <div className="flex justify-between items-center mb-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
              Forgot Password?
            </a>
          </div>
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
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
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
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
