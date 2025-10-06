import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';

const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"; // Replace with your Google OAuth client id

const Signup = () => {
  const { signup } = useAuth(); // Assuming you have a signup method
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const googleBtn = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    /* global google */
    if (window.google && googleBtn.current) {
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: (response) => {
          const id_token = response.credential;
          const payload = JSON.parse(atob(id_token.split('.')[1]));
          if (payload && payload.email) {
            // You can auto-fill the form or directly sign up
            signup({ email: payload.email, name: payload.name });
          }
        }
      });
      window.google.accounts.id.renderButton(googleBtn.current, {
        theme: 'outline',
        size: 'large',
        text: 'signup_with',
        shape: 'pill'
      });
    }
  }, [googleBtn, signup]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic
    signup(formData);
  };

  const gold = "#ffbf69";
  const border = "#f7dda4";

  return (
    <div style={{
      minHeight: "100vh",
      background: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <form onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: 520,
          background: "#fff",
          borderRadius: "16px",
          padding: "40px 27px 33px 27px",
          boxShadow: "0 0 32px #f7dda4",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "22px"
        }}>
        <img
          src="/logo.jpg"
          alt="Vijeta Club Logo"
          style={{
            width: "92px",
            height: "92px",
            borderRadius: "50%",
            objectFit: "cover",
            boxShadow: "0px 2px 13px #f7dda4",
            marginBottom: "5px"
          }}
        />
        <h1 style={{
          fontWeight: "bold",
          textAlign: "center",
          color: "#000",
          fontSize: "2.2rem",
          margin: "16px 0 15px 0"
        }}>Sign Up</h1>

        {/* Name Field */}
        <div style={{
          width: "100%",
          display: 'flex',
          alignItems: 'center',
          border: `2px solid ${border}`,
          background: "#fff",
          borderRadius: "10px",
          marginBottom: "8px",
          padding: "0 16px",
          height: 54,
        }}>
          <FaUser style={{ color: gold, fontSize: "1.3rem", marginRight: 11 }} />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              color: "#362710",
              outline: "none",
              fontSize: "1.13rem"
            }}
          />
        </div>

        {/* Email Field */}
        <div style={{
          width: "100%",
          display: 'flex',
          alignItems: 'center',
          border: `2px solid ${border}`,
          background: "#fff",
          borderRadius: "10px",
          marginBottom: "8px",
          padding: "0 16px",
          height: 54,
        }}>
          <FaEnvelope style={{ color: gold, fontSize: "1.3rem", marginRight: 11 }} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              color: "#362710",
              outline: "none",
              fontSize: "1.13rem"
            }}
          />
        </div>

        {/* Phone Field */}
        <div style={{
          width: "100%",
          display: 'flex',
          alignItems: 'center',
          border: `2px solid ${border}`,
          background: "#fff",
          borderRadius: "10px",
          marginBottom: "8px",
          padding: "0 16px",
          height: 54,
        }}>
          <FaPhone style={{ color: gold, fontSize: "1.3rem", marginRight: 11 }} />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              color: "#362710",
              outline: "none",
              fontSize: "1.13rem"
            }}
          />
        </div>

        {/* Password Field */}
        <div style={{
          width: "100%",
          display: 'flex',
          alignItems: 'center',
          border: `2px solid ${border}`,
          background: "#fff",
          borderRadius: "10px",
          marginBottom: "18px",
          padding: "0 16px",
          height: 54,
        }}>
          <FaLock style={{ color: gold, fontSize: "1.3rem", marginRight: 11 }} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              color: "#362710",
              outline: "none",
              fontSize: "1.13rem"
            }}
          />
        </div>

        <button type="submit" style={{
          width: "100%",
          padding: "16px 0",
          borderRadius: "5px",
          border: "none",
          background: gold,
          color: "#fff",
          fontWeight: "bold",
          fontSize: "1.17rem",
          letterSpacing: 1,
          marginTop: "6px",
          boxShadow: `0 2px 8px ${border}`,
          cursor: "pointer"
        }}>
          SIGN UP
        </button>
        
        {/* OR Divider */}
        <div style={{
          width: "100%",
          textAlign: "center",
          color: "#e5b35e",
          fontWeight: "bold",
          fontSize: "1.08rem",
          margin: "8px 0 8px 0",
          letterSpacing: 2
        }}>
          OR
        </div>

        <div ref={googleBtn} style={{
          width: "100%",
          margin: "0 0 8px 0"
        }} />

        <div style={{
          textAlign: "center",
          color: "#624c25",
          fontSize: "1.07rem",
          marginTop: "12px"
        }}>
          Already have an account?{" "}
          <Link to="/login" style={{
            color: "#df7116",
            fontWeight: "bold",
            textDecoration: "underline"
          }}>Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
