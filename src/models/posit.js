import destPoint from '../utils/destPoint';

const M_IN_MI = 1609.34;

class Posit {
  constructor (options) {
    this.lat = options.lat;
    this.lon = options.lon;
  }


  ptDistBrg(distance, bearing) { // distance in KM, bearing in degrees
    const R = 6378.1; // Radius of the Earth
    const brng = bearing * Math.PI / 180; // Convert bearing to radian
    let lat = this.lat * Math.PI / 180; // Current coords to radians
    let lon = this.lon * Math.PI / 180;

    lat = Math.asin(Math.sin(lat) * Math.cos(distance / R) + Math.cos(lat) * Math.sin(distance / R) * Math.cos(brng));
    lon += Math.atan2(Math.sin(brng) * Math.sin(distance / R) * Math.cos(lat), Math.cos(distance / R) - Math.sin(lat) * Math.sin(lat));

    // Coords back to degrees and return
    return {lat: (lat * 180 / Math.PI), lon: (lon * 180 / Math.PI)};
  }

  pointsOnMapCircle(distance, numPts) {
    const points = [];
    for (let i = 0; i <= numPts - 1; i++) {
      const bearing = Math.round((360 / numPts) * i);
      const newPoints = this.ptDistBrg(distance, bearing);
      points.push(newPoints);
    }
    return points;
  }

  toGeoJSON(dist = 5, numPts = 6) {
    let geoJSON = {
      "type": "FeatureCollection",
      "features": []
    };
    let points = this.pointsOnMapCircle(dist, numPts);
    points.forEach((p) => {
      geoJSON.features.push({
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [p.lon, p.lat]
        }
      });
    });
    return geoJSON
  }

  toJSON() {
    return {
      lat: this.lat,
      lon: this.lon,
    };
  }

};

export default Posit;
