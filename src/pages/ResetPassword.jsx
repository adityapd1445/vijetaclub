import React from 'react';
import { useLocation } from 'react-router-dom';

const ResetPassword = () => {
  // Get email from URL
  const query = new URLSearchParams(useLocation().search);
  const email = query.get('email');

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff"
    }}>
      <form style={{
        maxWidth: 480, background: "#fff", borderRadius: 16, padding: "40px 27px 33px 27px",
        boxShadow: "0 0 32px #f7dda4", display: "flex", flexDirection: "column", alignItems: "center", gap: 28
      }}>
        <h2 style={{ color: "#000", fontWeight: "bold", textAlign: "center" }}>
          Reset Password
        </h2>
        <p>Email: <strong>{email}</strong></p>
        <input
          type="password"
          placeholder="New Password"
          required
          style={{
            width: "100%", background: "#fff", border: "2px solid #f7dda4", borderRadius: "10px",
            padding: "0 16px", height: 54, color: "#362710", fontSize: "1.13rem"
          }}
        />
        <button type="submit" style={{
          width: "100%", padding: "16px 0", borderRadius: 5, border: "none",
          background: "#ffbf69", color: "#fff", fontWeight: "bold", fontSize: "1.17rem", cursor: "pointer"
        }}>
          Set New Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
