import { Avatar, Dropdown } from "rizzui";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../../store/store";
import supabaseClient from "../../../supabase/supabase";
export default function ProfileDropdown({
  username,
  classes,
}: {
  username: string;
  classes: string;
}) {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.log(error);
    }
    dispatch(userActions.setUser({ user: null, userType: null }));
  };
  return (
    <Dropdown placement="bottom-end" className={`${classes}`}>
      <Dropdown.Trigger>
        <Avatar
          name={username}
          className="cursor-pointer shadow-md ring-2 ring-gray-200 hover:ring-blue-500 transition-all duration-300"
        />
      </Dropdown.Trigger>
      <Dropdown.Menu className="bg-white shadow-xl rounded-lg border border-gray-100 overflow-hidden">
        <Dropdown.Item className="hover:bg-gray-50 transition-colors duration-200">
          <Link
            to="/dashboard"
            className="block px-4 py-2 text-gray-800 hover:text-blue-600 flex items-center space-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <span>Profile</span>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item className="hover:bg-gray-50 transition-colors duration-200">
          <div className="flex items-center space-x-2 px-4 py-2 text-gray-800 hover:text-blue-600 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
            </svg>
            <span>Settings</span>
          </div>
        </Dropdown.Item>
        <Dropdown.Item className="hover:bg-gray-50 transition-colors duration-200 border-t border-gray-100">
          <div
            className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer"
            onClick={handleLogout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L14.586 11H7a1 1 0 110-2h7.586l-1.293-1.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span>Logout</span>
          </div>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
