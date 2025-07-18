import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);
  const SignInPage = () => {
    navigate("/sign-in");
  };
  const handleLogout =() =>{
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    navigate("/");
  }
  return (
      <header className="bg-white font-family">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <img src={Logo} alt={Logo} className="w-12 h-8 sm:w-14 sm:h-10" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6 lg:space-x-8 font-semibold">
              <a href="#" className="text-gray-700 hover:text-primary transition duration-200">
                About
              </a>
              <a href="#" className="text-gray-700 hover:text-primary transition duration-200">
                Help
              </a>
              <a href="#" className="text-gray-700 hover:text-primary transition duration-200">
                Features
              </a>
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex">
              {isLoggedIn ? (
                  <div className="flex space-x-3 lg:space-x-4">
                    <button
                        onClick={() => navigate("/profile")}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                navigate("/profile");
                            }
                        }}
                        className="w-24 h-12 lg:w-32 xl:w-36 bg-primary hover:bg-purple-600 text-white px-3 py-2 cursor-pointer rounded-4xl font-medium text-sm lg:text-base transition duration-300 ease-in-out"
                    >
                      Profile
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-24 lg:w-32 xl:w-36 bg-primary hover:bg-purple-600 text-white px-3 py-2 rounded-4xl cursor-pointer font-medium text-sm lg:text-base transition duration-300 ease-in-out"
                    >
                      Logout
                    </button>
                  </div>
              ) : (
                  <button
                      className="w-24 lg:w-32 xl:w-36 h-10 text-center outline-none bg-primary text-white rounded-4xl hover:bg-purple-600 transition duration-300 ease-in-out font-medium text-sm lg:text-base"
                      onClick={SignInPage}
                  >
                    Sign In
                  </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden p-2 rounded-md hover:bg-gray-100 transition duration-200"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                  <X className="h-6 w-6 text-gray-700" />
              ) : (
                  <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
              <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
                  {/* Mobile Navigation Links */}
                  <a
                      href="#"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition duration-200"
                  >
                    About
                  </a>
                  <a
                      href="#"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition duration-200"
                  >
                    Help
                  </a>
                  <a
                      href="#"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition duration-200"
                  >
                    Features
                  </a>

                  {/* Mobile Auth Buttons */}
                  <div className="pt-4 space-y-3">
                    {isLoggedIn ? (
                        <>
                          <button
                              onClick={() => navigate("/profile")}
                              className="w-full bg-primary hover:bg-purple-600 text-white px-4 py-2 rounded-md font-medium text-sm transition duration-300 ease-in-out"
                          >
                            Profile
                          </button>
                          <button
                              onClick={handleLogout}
                              className="w-full bg-primary hover:bg-purple-600 text-white px-4 py-2 rounded-md font-medium text-sm transition duration-300 ease-in-out"
                          >
                            Logout
                          </button>
                        </>
                    ) : (
                        <button
                            className="w-full h-10 text-center outline-none bg-primary text-white rounded-md hover:bg-purple-600 transition duration-300 ease-in-out font-medium text-sm"
                            onClick={SignInPage}
                        >
                          Sign In
                        </button>
                    )}
                  </div>
                </div>
              </div>
          )}
        </div>
      </header>
  );
};
export default Header;
