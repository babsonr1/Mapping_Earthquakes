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

let earthquakes = new L.layerGroup();

let overlays = {
  Earthquakes: earthquakes
}

//creates one variable that holds both layers
let baseMaps = {
  "Streets": streets,
  "Satellite Streets": satelliteStreets
};

// Create the map object with a center, zoom level, and default layer.
let map = L.map('mapid', {
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets]
});

//code for layer button using baseMaps
L.control.layers(baseMaps, overlays).addTo(map);

let earthquakelink = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
/*let myStyle = {
  color: "#ffffa1",
  weight: 2
} */


function getColor(magnitude) {
  if (magnitude > 5) {
    return "#ea2c2c";
  }
  if (magnitude > 4) {
    return "#ea822c";
  }
  if (magnitude > 3) {
    return "#ee9c00";
  }
  if (magnitude > 2) {
    return "#eecc00";
  }
  if (magnitude > 1) {
    return "#d4ee00";
  }
  return "#98ee00";
}

function getRadius(magnitude){
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
}

function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}

d3.json(earthquakelink).then(function(data) {
  L.geoJSON(data, {
    pointToLayer: function(feature, latlng){
      return L.circleMarker(latlng);
      //.bindPopup("<h2>"+feature.properties.AREA_NAME+"</h2> <hr>");
    },
    style: styleInfo,
    onEachFeautre: function(feature, layer) {
      layer.bindPopup(feature.properties.mag+ "<br>" + feature.properties.place);
    }
  }).addTo(earthquakes);

  
  earthquakes.addTo(map);
});

