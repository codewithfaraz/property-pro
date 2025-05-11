import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
type AuthTab = "login" | "register";

const AuthPage = ({ closeModal }: { closeModal: () => void }) => {
  const [activeTab, setActiveTab] = useState<AuthTab>("login");
  // const navigate = useNavigate();

  return (
    <div className="container py-16">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            PropertyFinder
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {activeTab === "login"
              ? "Sign in to your account"
              : "Create a new account"}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b">
            <button
              type="button"
              className={`flex-1 py-4 px-4 text-center font-medium text-sm ${
                activeTab === "login"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              type="button"
              className={`flex-1 py-4 px-4 text-center font-medium text-sm ${
                activeTab === "register"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </div>

          {/* Form Content */}
          <div className="p-0">
            {activeTab === "login" ? (
              <LoginForm onClose={closeModal} />
            ) : (
              <RegisterForm onClose={closeModal} />
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            By signing in or creating an account, you agree to our{" "}
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
