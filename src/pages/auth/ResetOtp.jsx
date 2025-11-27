import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../utils/interceptor";

function ResetOtp() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const email = state?.email;

  // ✅ If email missing → redirect back
  useEffect(() => {
    if (!email) {
      navigate("/reset-password");
    }
  }, [email, navigate]);

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // ✅ BACKEND MATCHING ROUTE
      await API.post("/api/verify-otp", { email, otp });

      alert("OTP Verified Successfully ✅");

      // ✅ Navigate to new password page
      navigate(`/reset-password/${otp}`);

    } catch (err) {
      alert(err.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <form onSubmit={handleSubmit} style={{ width: "300px" }}>
        <h2>Verify Reset OTP</h2>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <button type="submit" disabled={loading} style={{ width: "100%", padding: "10px" }}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
}

export default ResetOtp;
