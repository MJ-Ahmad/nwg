class GeoGridMapEngine {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.map = null;
    this.layers = {};
    this.markers = {};
    this.routes = [];
    this.init();
  }

  init() {
    // Initialize Leaflet map
    this.map = L.map(this.container).setView([23.8103, 90.4125], 8);
    
    // Add base layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 19
    }).addTo(this.map);

    this.setupLayers();
  }

  setupLayers() {
    // Division layer
    this.layers.divisions = L.layerGroup().addTo(this.map);
    
    // District layer
    this.layers.districts = L.layerGroup();
    
    // Surveillance zones layer
    this.layers.surveillance = L.layerGroup().addTo(this.map);
    
    // Routes layer
    this.layers.routes = L.layerGroup();
    
    // Control centers layer
    this.layers.control_centers = L.layerGroup().addTo(this.map);
  }

  async loadDivisions(data) {
    data.divisions.forEach(division => {
      const marker = L.circleMarker([division.coordinates[0], division.coordinates[1]], {
        radius: 12,
        fillColor: '#47d7b3',
        color: '#2bbd9c',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.7
      });

      marker.bindPopup(`
        <strong>${division.name_en}</strong><br/>
        Population: ${division.population.toLocaleString()}<br/>
        Status: ${division.status}
      `);

      this.layers.divisions.addLayer(marker);
      this.markers[division.id] = marker;
    });
  }

  async loadSurveillanceZones(data) {
    data.surveillance_zones.forEach(zone => {
      const circle = L.circle([zone.coordinates[0], zone.coordinates[1]], {
        radius: zone.radius_km * 1000,
        color: '#79b7ff',
        weight: 2,
        opacity: 0.4,
        fillOpacity: 0.1
      });

      circle.bindPopup(`
        <strong>${zone.name_en}</strong><br/>
        Level: ${zone.level}<br/>
        Cameras: ${zone.monitoring_assets.cctv_cameras}
      `);

      this.layers.surveillance.addLayer(circle);
    });
  }

  addRoute(routeData, color = '#e7b75a') {
    const polyline = L.polyline(routeData.route, {
      color: color,
      weight: 3,
      opacity: 0.8
    });

    polyline.bindPopup(`
      <strong>${routeData.name_en}</strong><br/>
      Type: ${routeData.type}<br/>
      Monitoring Points: ${routeData.monitoring_points}
    `);

    this.layers.routes.addLayer(polyline);
  }

  toggleLayer(layerName, visible) {
    if (visible) {
      this.map.addLayer(this.layers[layerName]);
    } else {
      this.map.removeLayer(this.layers[layerName]);
    }
  }

  getLayerStats() {
    return {
      divisions: Object.keys(this.markers).length,
      surveillance_zones: this.layers.surveillance.getLayers().length,
      routes: this.routes.length
    };
  }
}

// Export for module usage
export default GeoGridMapEngine;
