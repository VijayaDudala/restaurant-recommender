import React, { useEffect, useState } from "react";

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetch("https://restaurant-recommender-api-laof.onrender.com/api/restaurants/")
      .then((res) => res.json())
      .then((data) => setRestaurants(data))
      .catch((err) => console.log(err));
  }, []);

  // ⭐ Rate restaurant
  const handleRate = (restaurantId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    fetch("https://restaurant-recommender-api-laof.onrender.com/api/rate/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        restaurant: restaurantId,
        score: 5,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Rating added!");
        console.log(data);

        // refresh page to update recommendations
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  // 📍 Current location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        alert(
          `Latitude: ${pos.coords.latitude}
Longitude: ${pos.coords.longitude}`
        );
      });
    } else {
      alert("Geolocation not supported");
    }
  };

  return (
    <div>
      <h2>🍽️ Restaurants</h2>

      {/* 🔍 Search */}
      <input
        placeholder="Search restaurants..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          boxSizing: "border-box",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid gray",
        }}
      />

      {/* 📍 Location Filter */}
      <select
        onChange={(e) => setLocation(e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "10px",
          width: "100%",
          borderRadius: "5px",
          boxSizing: "border-box",
        }}
      >
        <option value="">All Budgets</option>
        <option value="100">Budget</option>
        <option value="300">Mid Range</option>
        <option value="500">Premium</option>
      </select>

      {/* 📡 GPS */}
      <button
        onClick={getLocation}
        style={{
          padding: "10px",
          marginBottom: "15px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        📍 Use My Location
      </button>

      {/* 🍔 Restaurant Cards */}
      {restaurants
        .filter((r) =>
          r.name.toLowerCase().includes(search.toLowerCase())
        )
        .filter((r) =>
          location ? r.location.includes(location) : true
        )
        .map((r) => (
          <div
            key={r.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              backgroundColor: "white",
            }}
          >
            <h3>{r.name}</h3>

            <p>
              <strong>Category:</strong> {r.cuisine}
            </p>

            <p>
              <strong>Budget:</strong> ₹{r.location}
            </p>

            <p>
              <strong>Rating:</strong> ⭐ {r.rating}
            </p>

            {/* ⭐ Rate Button */}
            <button
              onClick={() => handleRate(r.id)}
              style={{
                padding: "8px 12px",
                backgroundColor: "#ff4d4d",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              ⭐ Rate 5
            </button>
          </div>
        ))}
    </div>
  );
}

export default RestaurantList;