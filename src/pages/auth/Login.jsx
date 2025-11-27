import React, { useState } from "react";
import API from "../../utils/interceptor";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/pages/Login.module.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/api/login", form);

      const token = res.data.token;
      localStorage.setItem("token", token);

      alert("Login successful!");
      navigate("/home");

    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.outer}>
      <div className={styles.frame}>
        <div className={styles.left}>
          <div className={styles.leftContent}>
            <h1>
              WELCOME
              <br />
              BACK!
            </h1>
            <p>Login to continue your journey</p>
          </div>
        </div>

        <div className={styles.right}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Login</h2>

            <label className={styles.field}>
              <span className={styles.labelText}>Email</span>
              <div className={styles.inputRow}>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </label>

            <label className={styles.field}>
              <span className={styles.labelText}>Password</span>

              <div className={styles.inputRow}>
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />

                <span
                  className={styles.showPass}
                  onClick={() => setShowPass(!showPass)}
                  style={{ cursor: "pointer" }}
                >
                  {showPass ? "Hide" : "Show"}
                </span>
              </div>
            </label>

            <p
              className={styles.forgot}
              onClick={() => navigate("/reset-password")}
            >
              Forgot Password?
            </p>

            {errorMsg && <p className={styles.error}>{errorMsg}</p>}

            <button className={styles.cta} type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className={styles.footerText}>
              Don't have an account?
              <button
                type="button"
                className={styles.link}
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
