import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import { useAuth } from './AuthContext'; //
const CLIENT_ID = "305261069007-7t1oas3j14ivc27nfr8382ul1cqk9nq5.apps.googleusercontent.com";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [message, setMessage] = useState('');
  const googleBtn = useRef(null);
  const navigate = useNavigate();

  // Obtain setUser from AuthContext so we can update state instantly
  const { setUser } = useAuth();

  const handleGoogleLogin = useCallback(async (googleUser) => {
    if (!isValidEmail(googleUser.email)) {
      setMessage('Invalid Google email address.');
      return;
    }
    try {
      // Try to login first
      let response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: googleUser.email,
          password: 'google-oauth'
        }),
      });
      let data = await response.json();
      if (data.success) {
        setMessage('Login successful.');
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user); // <--- Set context for immediate UI update
        setTimeout(() => navigate("/"), 500);
        return;
      }
      // If not found, try to register (signup)
      if (data.error && data.error.includes('not found')) {
        response = await fetch('http://localhost:4000/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: googleUser.name || 'Google User',
            email: googleUser.email,
            phone: '',
            password: `google-oauth-${Date.now()}`
          }),
        });
        data = await response.json();
        if (data.success) {
          setMessage('Google signup successful! Redirecting...');
          const userObj = {
            name: googleUser.name || 'Google User',
            email: googleUser.email,
            phone: ''
          };
          localStorage.setItem('user', JSON.stringify(userObj));
          setUser(userObj); // <- Set context to avoid reload
          setTimeout(() => navigate("/"), 500);
        } else {
          setMessage(data.error || 'Google signup failed');
        }
        return;
      }
      setMessage(data.error || 'Google login failed');
    } catch (error) {
      setMessage('Network error during Google login.');
    }
  }, [navigate, setUser]);

  useEffect(() => {
    if (window.google && googleBtn.current) {
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: (response) => {
          const id_token = response.credential;
          const payload = JSON.parse(atob(id_token.split('.')[1]));
          if (payload && payload.email) {
            handleGoogleLogin({ email: payload.email, name: payload.name });
          }
        }
      });
      window.google.accounts.id.renderButton(googleBtn.current, {
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'pill'
      });
    }
  }, [googleBtn, handleGoogleLogin]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!isValidEmail(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }
    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage('Login successful.');
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user); // <--- Set context for immediate UI update
        setTimeout(() => navigate("/"), 500);
      } else {
        setMessage(data.error || 'Login failed');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
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
      <form onSubmit={handleLogin}
        style={{
          width: "100%",
          maxWidth: 480,
          background: "#fff",
          borderRadius: "16px",
          padding: "40px 27px 33px 27px",
          boxShadow: "0 0 32px #f7dda4",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "28px"
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
          color: '#000',
          fontSize: "2.2rem",
          margin: "16px 0 10px 0"
        }}>Login</h1>

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
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
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

        <div style={{
          width: "100%",
          display: 'flex',
          alignItems: 'center',
          border: `2px solid ${border}`,
          background: "#fff",
          borderRadius: "10px",
          marginBottom: "12px",
          padding: "0 16px",
          height: 54,
        }}>
          <FaLock style={{ color: gold, fontSize: "1.3rem", marginRight: 11 }} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
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

        {message && (
          <div style={{
            color: message.includes('success') ? 'green' : 'red',
            fontSize: '0.94rem',
            marginBottom: '2px',
            textAlign: 'center'
          }}>
            {message}
          </div>
        )}

        <div style={{
          width: "100%",
          textAlign: "right",
          marginBottom: 12
        }}>
          <button
            type="button"
            onClick={handleForgotPassword}
            style={{
              background: "transparent",
              border: "none",
              color: "#b288f6",
              fontSize: "1.08rem",
              textDecoration: "underline",
              fontWeight: "500",
              cursor: "pointer"
            }}
          >
            Forgot Password
          </button>
        </div>

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
            marginTop: "4px",
            boxShadow: `0 1px 2px ${border}`,
            cursor: "pointer",
            transition: "background 0.2s"
          }}>
          LOGIN
        </button>

        <div style={{
          width: "100%",
          textAlign: "center",
          color: "#e5b35e",
          fontWeight: "bold",
          fontSize: "1.08rem",
          margin: "0px 0 0px 0",
          letterSpacing: 1
        }}>
          OR
        </div>

        <div ref={googleBtn} style={{
          width: "100%",
          margin: "0px 0 0px 0"
        }} />

        <div style={{
          textAlign: "center",
          color: "#624c25",
          fontSize: "1.07rem",
          marginTop: "12px"
        }}>
          Don&apos;t have an account?{" "}
          <Link to="/signup" style={{
            color: "#df7116",
            fontWeight: "bold",
            textDecoration: "underline"
          }}>Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
