console.log("Working");

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([30, 30], 2);
// We create the tile layer that will be the background of our map.
/*let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]}; */

/*L.geoJSON(sanFranAirport, {
  onEachFeature: function(feature, layer){
    console.log(layer);
    layer.bindPopup("<h2>"+feature.properties.faa+"</h2> <hr> <h3>"+feature.properties.name+"</h3>");
  }
}).addTo(map); */

/*let cityData = cities;
cityData.forEach(function(city) {
    console.log(city);
    L.circleMarker(city.location, {
        radius: city.population/100000
    })
    .bindPopup("<h2>" + city.city+", "+ city.state+"</h2> <hr> <h3>Population "+city.population.toLocaleString()+"</h3>")
    .addTo(map);
});*/

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

streets.addTo(map);
let airportData ="https://raw.githubusercontent.com/babsonr1/Mapping_Earthquakes/Mapping_GeoJSON_Points/Mapping_GeoJSON_Points/majorAirports.json";

d3.json(airportData).then(function(data) {
  L.geoJSON(data, {
    onEachFeature: function(feature, layer){
      layer.bindPopup("<h2>"+feature.properties.faa+"</h2> <hr> <h3>"+feature.properties.name+"</h3>");
    }
  }).addTo(map);
});
