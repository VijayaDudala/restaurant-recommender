import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import RestaurantList from "./components/RestaurantList";
import Recommendation from "./components/Recommendation";
import Navbar from "./components/Navbar";

function Home() {
  return (
    <div>
      <Navbar />

      <div
  style={{
    display: "grid",
    gridTemplateColumns:
        window.innerWidth < 768 ? "1fr" : "2fr 1fr",
    gap: "20px",
    alignItems: "start",
  }}
>
        <div style={{ flex: 2 }}>
          <RestaurantList />
        </div>

        <div style={{ flex: 1 }}>
          <Recommendation />
        </div>
      </div>
    </div>
  );
}

function App() {
  const token = localStorage.getItem("token");

  return (
    <div style={{ padding: "20px" ,
      backgroundColor: "#f5f5f5",
minHeight: "100vh",
    }}>
      <h1>🍽️ Restaurant Recommender</h1>

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected route */}
        <Route
          path="/home"
          element={token ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;