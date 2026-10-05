const express = require('express');
const router = express.Router();

// GET all geographic hierarchy
router.get('/hierarchy', (req, res) => {
  res.json({
    status: 'ok',
    hierarchy: ['division', 'district', 'thana', 'union', 'ward', 'neighborhood']
  });
});

// GET surveillance zones
router.get('/surveillance-zones', (req, res) => {
  res.json({
    status: 'ok',
    total_zones: 1200,
    active_zones: 1180
  });
});

// POST incident report
router.post('/incidents', (req, res) => {
  const { zone, severity, description } = req.body;
  res.json({
    status: 'incident_recorded',
    id: `INC-${Date.now()}`,
    zone,
    severity,
    timestamp: new Date()
  });
});

// GET real-time monitoring data
router.get('/monitoring/:zone_id', (req, res) => {
  res.json({
    zone_id: req.params.zone_id,
    active_cameras: 85,
    active_sensors: 24,
    current_incidents: 3,
    response_time_avg_sec: 120
  });
});

module.exports = router;
