import React, { useState } from "react";

const events2023 = [
  { name: "Saraswati Puja", images: ["/image.jpg", "/logo.jpg"] },
  { name: "Holi", images: ["/logo.jpg"] },
  { name: "Baba Dham Kawar Yatra", images: ["/logo.jpg"] },
  { name: "Durga Puja", images: ["/logo.jpg"] }
];

const Gallery = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div style={{
      padding: "48px 16px",
      minHeight: "100vh",
      textAlign: "center",
      background: "#faf5ea"
    }}>
      <h2 style={{ color: "#df7116", marginBottom: 20 }}>Gallery</h2>
      <h3 style={{ color: "#b16226", marginBottom: 30 }}>Events of 2023</h3>
      {!selectedEvent ? (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmin(200px, 1fr))",
          gap: "30px",
          maxWidth: 900,
          margin: "0 auto"
        }}>
          {events2023.map(event => (
            <button
              key={event.name}
              onClick={() => setSelectedEvent(event)}
              style={{
                background: "#fff",
                border: "none",
                boxShadow: "0 2px 12px #ede7e7",
                padding: "28px 0",
                borderRadius: "10px",
                minWidth: "120px",
                minHeight: "65px",
                cursor: "pointer",
                fontWeight: 700,
                color: "#B16226",
                fontSize: "1.14rem",
                transition: "0.2s"
              }}
            >
              {event.name}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <h3 style={{ color: "#df7116", marginBottom: 14 }}>{selectedEvent.name}</h3>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "18px"
          }}>
            {selectedEvent.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt=""
                style={{
                  width: "170px",
                  height: "110px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  boxShadow: "0 2px 10px #dadada",
                  marginBottom: "12px"
                }}
              />
            ))}
          </div>
          <button
            style={{
              marginTop: "15px",
              background: "#df7116",
              color: "#fff",
              padding: "8px 26px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              fontWeight: 500,
              fontSize: "1rem"
            }}
            onClick={() => setSelectedEvent(null)}
          >
            Back to Events
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
