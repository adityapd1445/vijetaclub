import React, { useState } from "react";

const Donations = () => {
  const [donation, setDonation] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="home-center">
      <h2 style={{ color: "#df7116" }}>Donate to Vijeta Club</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            style={{
              width: "250px",
              padding: "11px",
              margin: "10px",
              borderRadius: "6px",
              border: "1.5px solid #f6cfa0",
              fontSize: "1.06rem"
            }}
          />
          <input
            type="number"
            placeholder="Amount (₹)"
            value={donation}
            onChange={e => setDonation(e.target.value)}
            required
            style={{
              width: "250px",
              padding: "11px",
              margin: "10px",
              borderRadius: "6px",
              border: "1.5px solid #f6cfa0",
              fontSize: "1.06rem"
            }}
          />
          <button type="submit" style={{ width: "250px", marginTop: "15px" }}>Donate</button>
        </form>
      ) : (
        <p style={{ fontSize: "1.2rem", color: "#df7116", textAlign: "center" }}>
          Thank you, <b>{name}</b>, for your donation of <b>₹{donation}</b>!
        </p>
      )}
    </div>
  );
};

export default Donations;
