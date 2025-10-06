import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';

// Replace with your Google OAuth client id!
const CLIENT_ID = "305261069007-7t1oas3j14ivc27nfr8382ul1cqk9nq5.apps.googleusercontent.com";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
            login({ email: payload.email });
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
  }, [googleBtn, login]);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email });
  };

  const handleForgetPassword = () => {
    // Handle forget password logic
    alert('Forget password functionality to be implemented');
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

        <div style={{
          width: "100%",
          textAlign: "right",
          marginBottom: 12
        }}>
          <button
            type="button"
            onClick={handleForgetPassword}
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
            Forget Password
          </button>
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
          marginTop: "4px",
          boxShadow: `0 1px 2px ${border}`,
          cursor: "pointer"
        }}>
          LOGIN
        </button>
        
        {/* OR Divider */}
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
