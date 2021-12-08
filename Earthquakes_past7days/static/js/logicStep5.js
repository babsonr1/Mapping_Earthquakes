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

//creating overlays
let earthquakes = new L.layerGroup();

//creating keys for control.layers to access for overlays
let overlays = {
  Earthquakes: earthquakes
};

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

//colors of mags of earthquakes
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
    },
    style: styleInfo,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h2> Magnitude - "+feature.properties.mag+ "</h2><hr><h3>" + feature.properties.place+"</h3>");
    }
  }).addTo(earthquakes);

  let legend = L.control({
    position: "bottomright"
  });

  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    let magnitudes = [0, 1, 2, 3, 4, 5];
    let colors = [
      "#98ee00",
      "#d4ee00",
      "#eecc00",
      "#ee9c00",
      "#ea822c",
      "#ea2c2c"
    ];

    for (var i = 0; i < magnitudes.length; i++) {
      div.innerHTML +=
        "<i style='background: " + colors[i] + "'></i> " +
        magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
   }
  return div;
  };
 
  legend.addTo(map);

  earthquakes.addTo(map);

  
});

