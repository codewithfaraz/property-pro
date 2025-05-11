import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HashLoader } from "react-spinners";
import { userActions } from "../../../store/store";
import ProfileDropdown from "./ProfileDropdown";
import { apiClient } from "../../../api/api.config";
import supabaseClient from "../../../supabase/supabase";
import { useSelector } from "react-redux";
import { Modal } from "rizzui";
import AuthPage from "../Auth/AuthPage";
import { UserState } from "../../../types/userTypes";

const Navbar: React.FC = () => {
  const user = useSelector((state: UserState) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [storedUser, setStoredUser] = useState(user as UserState | null);
  useEffect(() => {
    async function getUser() {
      setIsLoading(true);
      console.log("it run");
      const { data } = await supabaseClient.auth.getUser();
      if (data.user) {
        const user = await apiClient.get("/get-user", {
          params: {
            email: data.user.email,
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
      }
    }
    getUser();
    setIsLoading(false);
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (event) => {
        if (event === "SIGNED_OUT") {
          dispatch(userActions.setUser({ user: null, userType: null }));
        } else if (event === "SIGNED_IN") {
          getUser();
        }
      }
    );

    setStoredUser(user as UserState | null);
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [user]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleAuthClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
    // navigate("/auth");
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <HashLoader color="#076cfa" />
        </div>
      ) : (
        <nav
          className={`fixed top-0 w-full z-50 transition-all duration-300 
          ${
            isScrolled
              ? "bg-white/80 shadow-lg backdrop-blur-lg"
              : "bg-white/60 backdrop-blur-md"
          }`}
        >
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="p-4">
              <AuthPage closeModal={() => setIsModalOpen(false)} />
            </div>
          </Modal>
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center">
                <a href="/" className="flex items-center">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                  </svg>
                  <span className="ml-2 text-xl font-bold text-gray-800">
                    PropertyPro
                  </span>
                </a>
              </div>

              {/* Desktop Navigation */}

              <div className="hidden md:flex items-center space-x-8">
                <a
                  href="/"
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300"
                >
                  Home
                </a>
                <a
                  href="/properties"
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300"
                >
                  Properties
                </a>
                <a
                  href="/about"
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300"
                >
                  About
                </a>
                <a
                  href="/contact"
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300"
                >
                  Contact
                </a>
              </div>

              {/* CTA Buttons */}

              {storedUser && storedUser.user ? (
                <ProfileDropdown
                  username={storedUser.user.fullName}
                  classes="hidden md:flex"
                />
              ) : (
                <div className="hidden md:flex items-center space-x-4">
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300"
                    onClick={handleAuthClick}
                  >
                    Login
                  </a>
                  <a
                    href="#"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-all duration-300 shadow-sm hover:shadow"
                    onClick={handleAuthClick}
                  >
                    Register
                  </a>
                </div>
              )}

              {/* Mobile Menu Button */}
              <div className="flex md:hidden items-center space-x-4 justify-center">
                {storedUser && storedUser.user ? (
                  <ProfileDropdown
                    username={storedUser.user.fullName}
                    classes=""
                  />
                ) : (
                  ""
                )}
                <div className="md:hidden">
                  <button
                    type="button"
                    className={`z-50 relative text-gray-600 hover:text-gray-800 transition-colors duration-300 ${
                      isMenuOpen ? "text-gray-800" : ""
                    }`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {isMenuOpen ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      )}
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 md:hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? "visible" : "invisible"
        }`}
        style={{ zIndex: 40 }}
      >
        {/* Background Overlay */}
        <div
          className={`absolute inset-0 bg-white transition-opacity duration-500 ${
            isMenuOpen ? "opacity-95" : "opacity-0"
          }`}
        />

        {/* Menu Content */}
        <div
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ top: "64px" }}
        >
          <div className="flex flex-col h-full bg-white">
            <div className="flex-1 flex flex-col items-center justify-center space-y-8 p-4">
              <a
                href="/"
                className="text-2xl text-gray-800 hover:text-blue-600 font-medium transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="/properties"
                className="text-2xl text-gray-800 hover:text-blue-600 font-medium transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Properties
              </a>
              <a
                href="/about"
                className="text-2xl text-gray-800 hover:text-blue-600 font-medium transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="/contact"
                className="text-2xl text-gray-800 hover:text-blue-600 font-medium transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </div>

            {storedUser && storedUser.user ? (
              ""
            ) : (
              <div className="p-8 flex flex-col space-y-4 bg-gray-50">
                <a
                  href="#"
                  className="w-full text-center text-gray-800 hover:text-blue-600 text-lg font-medium transition-colors duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    // navigate("/auth");
                    setIsMenuOpen(false);
                  }}
                >
                  Login
                </a>
                <a
                  href="#"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium py-3 px-6 rounded-md transition-all duration-300 text-center shadow-sm hover:shadow"
                  onClick={(e) => {
                    e.preventDefault();
                    // navigate("/auth");
                    setIsMenuOpen(false);
                  }}
                >
                  Register
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
