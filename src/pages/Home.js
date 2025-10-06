const Home = () => (
  <div style={{
    padding: "60px 20px",
    minHeight: "100vh",
    textAlign: "center",
    background: "transparent",
    display: "block",
    position: "relative",
    overflow: "hidden"
  }}>
    {/* Background overlay logo */}
    <img
      src="/logo.jpg"
      alt="Background Logo"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "700px",
        height: "700px",
        opacity: 0.20,
        zIndex: 0,
        pointerEvents: "none",
        objectFit: "contain"
      }}
    />
    
    {/* Main content above the overlay */}
    <div style={{ position: "relative", zIndex: 1 }}>
      <h1 style={{ 
        fontSize: "2.5rem", 
        color: "#df7116", 
        marginBottom: "24px", 
        textAlign: "center" 
      }}>
        Welcome to Vijeta Club
      </h1>
      <p style={{
        maxWidth: 530,
        textAlign: "center",
        fontSize: "1.18rem",
        color: "#444",
        margin: "0 auto 30px auto"
      }}>
        Vijeta Club celebrates tradition, devotion, and community spirit through grand cultural performances and cherished rituals.
      </p>
    </div>
  </div>
);

export default Home;
