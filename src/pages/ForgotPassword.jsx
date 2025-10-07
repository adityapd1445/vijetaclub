import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:4000/api/send-password-reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMsg('If your email is registered, a reset link has been sent.');
        } else {
          setMsg('There was an error sending the reset link.');
        }
      })
      .catch(() => {
        setMsg('There was an error sending the reset link.');
      });
  };

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
        <h2 style={{
          color: "#000",
          fontWeight: "bold",
          textAlign: "center"
        }}>Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            background: "#fff",
            border: "2px solid #f7dda4",
            borderRadius: "10px",
            padding: "0 16px",
            height: 54,
            color: "#362710",
            fontSize: "1.13rem"
          }}
        />
        <button type="submit" style={{
          width: "100%",
          padding: "16px 0",
          borderRadius: "5px",
          border: "none",
          background: "#ffbf69",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "1.17rem",
          cursor: "pointer"
        }}>
          Send Reset Link
        </button>
        {msg && <div style={{ color: "green", marginTop: 5 }}>{msg}</div>}
      </form>
    </div>
  );
};

export default ForgotPassword;
