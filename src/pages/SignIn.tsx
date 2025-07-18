import { useState } from "react";
import styles from "../styles/SignIn.module.css";
import Logo from "../assets/Logo.png";
import { signIn } from "../api/auth";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (userName.trim() === "") {
      alert("Please enter a username");
      return;
    }
    // Clear any existing tokens
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    // Call the signIn function from the auth API
    await signIn(userName);
    console.log(userName);
    if (
      localStorage.getItem("accessToken") &&
      localStorage.getItem("refreshToken")
    ) {
      navigate("/");
    } else {
      alert("Sign in failed. Please try again.");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={Logo} alt="Logo" style={{ width: 50, height: 36 }} />
      </div>
      <div
        style={{
          margin: "auto",
          width: "300px",
          padding: "20px",
        }}
      >
        <h2 className={styles.title}>Sign In</h2>
        <label htmlFor="username" className={styles.label}>
          Username
        </label>
        <input
          id="username"
          type="text"
          className={styles.input}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button className={styles.button} onClick={handleSignIn}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignIn;
