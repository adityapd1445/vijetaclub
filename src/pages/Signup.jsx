import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';

const CLIENT_ID = "305261069007-7t1oas3j14ivc27nfr8382ul1cqk9nq5.apps.googleusercontent.com"; // Replace with your Google OAuth client id

function isValidEmail(email) {
  // Simple regex for email validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const Signup = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const googleBtn = useRef(null);

  const handleGoogleSignup = async (googleUser) => {
  try {
    const response = await fetch('http://localhost:4000/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: googleUser.name || 'Google User',   // fallback if no name
        email: googleUser.email,
        phone: '', // or get number from somewhere if needed
        password: `google-oauth-${Date.now()}`
      }),
    });
    const data = await response.json();
    if (data.success) {
      setMessage('Google signup successful! You can now log in.');
    } else {
      setMessage(data.error || 'Google signup failed');
    }
  } catch (error) {
    setMessage('Network error during Google signup.');
  }
};


  useEffect(() => {
    if (window.google && googleBtn.current) {
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: (response) => {
          const id_token = response.credential;
          const payload = JSON.parse(atob(id_token.split('.')[1]));
          if (payload && payload.email) {
            handleGoogleSignup({ email: payload.email, name: payload.name });
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
  }, [googleBtn]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // Frontend email validation
    if (!isValidEmail(formData.email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setMessage('Signup successful! You can now log in.');
        setFormData({ name: '', email: '', phone: '', password: '' });
      } else {
        setMessage(data.error || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setMessage('Network error. Please try again.');
    }
  };

  const gold = "#ffbf69";
  const border = "#f7dda4";
  const hoverColor = "#e09537";

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

        {/* Success/Error Message */}
        {message && (
          <div style={{
            color: message.includes('successful') ? 'green' : 'red',
            fontSize: '0.94rem',
            marginBottom: '2px',
            textAlign: 'center'
          }}>
            {message}
          </div>
        )}

        <button
          type="submit"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            width: "100%",
            padding: "16px 0",
            borderRadius: "5px",
            border: "none",
            background: isHovered ? hoverColor : gold,
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.17rem",
            letterSpacing: 1,
            marginTop: "6px",
            boxShadow: `0 2px 8px ${border}`,
            cursor: "pointer",
            transition: "background 0.2s"
          }}
        >
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
