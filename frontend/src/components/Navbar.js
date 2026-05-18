import React from "react";

function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "#ff4d4d",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "20px",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2 style={{ margin: 0 }}>🍔 FoodieFinder</h2>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
        style={{
          padding: "8px 12px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;