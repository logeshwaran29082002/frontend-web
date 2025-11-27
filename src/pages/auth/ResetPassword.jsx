import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/interceptor";
import styles from "../../styles/pages/ResetPassword.module.css";

function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/api/reset-password", { email });

      alert("Reset OTP sent to your email!");
      navigate("/reset-otp", {
        state: { email },
      });

    } catch (err) {
      setMsg(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className={styles.outer}>
      <div className={styles.frame}>
        <div className={styles.left}>
          <div className={styles.leftContent}>
            <h1>Reset<br/>Password</h1>
            <p>Enter your registered email to get the reset OTP.</p>
          </div>
        </div>

        <div className={styles.right}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Reset Password</h2>

            <label className={styles.field}>
              <span className={styles.labelText}>Email</span>
              <div className={styles.inputRow}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </label>

            <button className={styles.cta} type="submit">
              Send OTP
            </button>

            {msg && <p className={styles.error}>{msg}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
