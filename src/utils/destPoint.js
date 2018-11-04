
const destPoint = (initial = {lat: 0, lon: 0}, dist = 5, bearing = 0, units = 'MI') => {
  let earth_rad = units === 'MI' ? 3959 : 6371;
  var lat = initial.lat + Math.asin( Math.sin(initial.lat)*Math.cos(dist/earth_rad) + Math.cos(initial.lat)*Math.sin(dist/earth_rad)*Math.cos(bearing) );
  var lon = initial.lon + Math.atan2(Math.sin(bearing)*Math.sin(dist/earth_rad)*Math.cos(initial.lat), Math.cos(dist/earth_rad)-Math.sin(initial.lat)*Math.sin(lat));
  return {lat, lon};
}

export default destPoint;