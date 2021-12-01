//creates light view filter
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'light-v10',
    accessToken: API_KEY
});

//creates dark view filter
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'dark-v10',
    accessToken: API_KEY
});

//creates one variable that holds both layers
let baseMaps = {
  Street: light,
  Dark: dark
};

// Create the map object with a center, zoom level, and default layer.
let map = L.map('mapid', {
  center: [44.0, -80.0],
  zoom: 2,
  layers: [light]
});

//code for layer button using baseMaps
L.control.layers(baseMaps).addTo(map);

let airportData ="https://raw.githubusercontent.com/babsonr1/Mapping_Earthquakes/Mapping_GeoJSON_Points/Mapping_GeoJSON_Points/majorAirports.json";

d3.json(airportData).then(function(data) {
  L.geoJSON(data, {
    onEachFeature: function(feature, layer){
      layer.bindPopup("<h2>"+feature.properties.faa+"</h2> <hr> <h3>"+feature.properties.name+"</h3>");
    }
  }).addTo(map);
});
