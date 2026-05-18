import React, { useEffect, useState } from "react";

function Recommendation() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      "https://restaurant-recommender-api-laof.onrender.com/api/recommend/?user_id=1"
    )
      .then((res) => res.json())
      .then((data) => {
        // ensure array
        if (Array.isArray(data)) {
          setData(data);
        } else {
          setData([]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>🤖 Recommended for you</h2>

      {data.length === 0 ? (
        <p>No recommendations yet. Rate some restaurants!</p>
      ) : (
        data.map((r) => (
          <div
            key={r.id}
            style={{
              backgroundColor: "white",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
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
          </div>
        ))
      )}
    </div>
  );
}

export default Recommendation;