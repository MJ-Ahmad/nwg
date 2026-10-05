const express = require("express");
const app = express();
const port = 4000;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "national-workforce-grid-api",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/geography", (req, res) => {
  res.json({
    country: "Bangladesh",
    hierarchy: ["Division", "District", "Thana", "Union", "Ward", "Neighborhood"]
  });
});

app.get("/api/roles", (req, res) => {
  res.json({
    roles: [
      "National Director",
      "Division Head",
      "District Coordinator",
      "Thana Manager",
      "Union Leader",
      "Ward Coordinator",
      "Team Member"
    ]
  });
});

app.get("/api/policies", (req, res) => {
  res.json({
    policies: [
      "Code of Conduct",
      "Reward & Recognition",
      "Disciplinary Model",
      "Data Security"
    ]
  });
});

app.listen(port, () => {
  console.log(`NWG API running on http://localhost:${port}`);
});
