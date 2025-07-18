import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import styles from "../styles/Header.module.css";

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

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerContent}>
            {/* Logo */}
            <div className={styles.logoContainer}>
              <img src={Logo} alt={Logo} className={styles.logo} />
            </div>

            {/* Desktop Navigation */}
            <nav className={styles.desktopNav}>
              <a href="#" className={styles.navLink}>
                About
              </a>
              <a href="#" className={styles.navLink}>
                Help
              </a>
              <a href="#" className={styles.navLink}>
                Features
              </a>
            </nav>

            {/* Desktop Auth Buttons */}
            <div className={styles.desktopAuth}>
              {isLoggedIn ? (
                  <div className={styles.authButtonGroup}>
                    <button
                        onClick={() => navigate("/profile")}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            navigate("/profile");
                          }
                        }}
                        className={`${styles.authButton} ${styles.profileButton}`}
                    >
                      Profile
                    </button>
                    <button
                        onClick={handleLogout}
                        className={`${styles.authButton} ${styles.logoutButton}`}
                    >
                      Logout
                    </button>
                  </div>
              ) : (
                  <button
                      className={`${styles.authButton} ${styles.signInButton}`}
                      onClick={SignInPage}
                  >
                    Sign In
                  </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
                className={styles.mobileMenuButton}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                  <X className={styles.menuIcon} />
              ) : (
                  <Menu className={styles.menuIcon} />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
              <div className={styles.mobileMenu}>
                <div className={styles.mobileMenuContent}>
                  {/* Mobile Navigation Links */}
                  <a href="#" className={styles.mobileNavLink}>
                    About
                  </a>
                  <a href="#" className={styles.mobileNavLink}>
                    Help
                  </a>
                  <a href="#" className={styles.mobileNavLink}>
                    Features
                  </a>

                  {/* Mobile Auth Buttons */}
                  <div className={styles.mobileAuthSection}>
                    {isLoggedIn ? (
                        <>
                          <button
                              onClick={() => navigate("/profile")}
                              className={`${styles.mobileAuthButton} ${styles.mobileProfileButton}`}
                          >
                            Profile
                          </button>
                          <button
                              onClick={handleLogout}
                              className={`${styles.mobileAuthButton} ${styles.mobileLogoutButton}`}
                          >
                            Logout
                          </button>
                        </>
                    ) : (
                        <button
                            className={`${styles.mobileAuthButton} ${styles.mobileSignInButton}`}
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