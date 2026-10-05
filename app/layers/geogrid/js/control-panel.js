class GeoGridControlPanel {
  constructor(mapEngine) {
    this.mapEngine = mapEngine;
    this.init();
  }

  init() {
    this.createLayerToggle();
    this.createMonitoringDashboard();
    this.createDecisionPanel();
  }

  createLayerToggle() {
    const toggle = document.getElementById("layer-toggle");
    if (!toggle) return;

    const layers = [
      { name: "divisions", label: "Divisions", checked: true },
      { name: "surveillance", label: "Surveillance Zones", checked: true },
      { name: "districts", label: "Districts", checked: false },
      { name: "routes", label: "Routes", checked: false }
    ];

    toggle.innerHTML = layers.map(layer => `
      <label>
        <input type="checkbox" name="${layer.name}" ${layer.checked ? 'checked' : ''} />
        ${layer.label}
      </label>
    `).join("");

    toggle.addEventListener("change", (e) => {
      if (e.target.type === "checkbox") {
        this.mapEngine.toggleLayer(e.target.name, e.target.checked);
      }
    });
  }

  createMonitoringDashboard() {
    const dashboard = document.getElementById("monitoring-dashboard");
    if (!dashboard) return;

    dashboard.innerHTML = `
      <div class="monitor-card">
        <h3>Real-time Incidents</h3>
        <div id="incidents-list"></div>
      </div>
      <div class="monitor-card">
        <h3>Coverage Status</h3>
        <div id="coverage-status"></div>
      </div>
      <div class="monitor-card">
        <h3>Response Time</h3>
        <div id="response-time"></div>
      </div>
    `;

    this.updateMonitoring();
  }

  updateMonitoring() {
    // Simulated real-time data
    const incidents = [
      { zone: "Motijheel", time: "14:32", severity: "high", status: "responding" },
      { zone: "Gulshan", time: "14:28", severity: "medium", status: "investigating" },
      { zone: "Banani", time: "14:15", severity: "low", status: "resolved" }
    ];

    const incidentsList = document.getElementById("incidents-list");
    if (incidentsList) {
      incidentsList.innerHTML = incidents.map(i => `
        <div class="incident ${i.severity}">
          <span>${i.zone}</span>
          <span>${i.time}</span>
          <span>${i.status}</span>
        </div>
      `).join("");
    }
  }

  createDecisionPanel() {
    const panel = document.getElementById("decision-panel");
    if (!panel) return;

    panel.innerHTML = `
      <div class="decision-node">
        <h4>Union Level</h4>
        <button class="decision-btn">Allocate Resources</button>
        <button class="decision-btn">Assign Tasks</button>
      </div>
      <div class="decision-node">
        <h4>Thana Level</h4>
        <button class="decision-btn">Coordinate Zones</button>
        <button class="decision-btn">Emergency Response</button>
      </div>
      <div class="decision-node">
        <h4>District Level</h4>
        <button class="decision-btn">District Strategy</button>
        <button class="decision-btn">Resource Distribution</button>
      </div>
    `;
  }
}

export default GeoGridControlPanel;
