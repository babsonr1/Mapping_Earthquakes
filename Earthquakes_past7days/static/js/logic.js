//creates streets view filter
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'streets-v11',
    accessToken: API_KEY
});

//creates satellite streets view filter
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'satellite-streets-v11',
    accessToken: API_KEY
});

//creates one variable that holds both layers
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets
};

// Create the map object with a center, zoom level, and default layer.
let map = L.map('mapid', {
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets]
});

//code for layer button using baseMaps
L.control.layers(baseMaps).addTo(map);

let earthquakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
let myStyle = {
  color: "#0000ff",
  weight: 1,
}

d3.json(earthquakes).then(function(data) {
  L.geoJSON(data, {
    style: myStyle,
    onEachFeature: function(feature, layer){
    layer.bindPopup("<h2>"+feature.properties.AREA_NAME+"</h2> <hr>");
    }
  }).addTo(map);
});
