

function drawCircles(data){
    earthquakeEvent = data.features;
    
    for (var i = 0; i <earthquakeEvent.length; i++){
        // Conditionals for countries points
        console.log("in for loop");
        var color = "";
        if (earthquakeEvent[i].properties.mag> 5){
            color =  "#ff4422";
        }
        else if (earthquakeEvent[i].properties.mag > 4){
            color = "#e3972d";
        }
        else if (earthquakeEvent[i].properties.mag > 3){
            color = "#cfb463";
        }
        else if (earthquakeEvent[i].properties.mag> 2){
            color = "#e9f50a";
        }
        else if (earthquakeEvent[i].properties.mag> 1){
            color = "#0af5ce";
        }
        else{
            color = "#a3f05b";
        }
            
        //Add circles to map
        L.circle([earthquakeEvent[i].geometry.coordinates[1],earthquakeEvent[i].geometry.coordinates[0]], {
            fillOpacity: 0.75,
            color: null,
            fillColor: color,
            // Adjust radius
            radius: earthquakeEvent[i].properties.mag * 80000
            }).bindPopup("<h1>" + earthquakeEvent[i].properties.place + "</h1> <hr> <hp>Time: " + earthquakeEvent[i].properties.time + "</h3>").addTo(myMap);     
    }
};

function getColor (d) {
    if (d>=5){
        return "#ff4422"
    }

    else if (d>=4){
        return "#e3972d"
    }  

    else if (d>=3){
        return "#cfb463"
    }

    else if (d>=2){
        return "#0af5ce"
    }

    else {
        return "#a3f05b"
    }
}



// Create a map object
var myMap = L.map("map", {
center: [38.8026, -100],
zoom: 4
});

L.tileLayer("https://api.mapbox.com/styles/v1/sakia/ckbzewzk50m7g1ipb865blcxz/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2FraWEiLCJhIjoiY2tibnNtYjRrMDduMDJ4cG9nb3Z6M2doMSJ9.sxF7zKYjjXf6VOgV7IAvRw", {
attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
tileSize: 512,
maxZoom: 18,
zoomOffset: -1,
id: "mapbox/streets-v11",
accessToken: API_KEY
}).addTo(myMap);
  


var geojson = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
//Use the geojson api url 
d3.json(geojson, function(data){
    console.log(data)
    //Send the data.features object to the createFeature
    drawCircles(data);
});

//adding the legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (myMap) {
  
      var div = L.DomUtil.create('div', 'info legend'),
          magnitudes = [0, 1, 2, 3, 4, 5];
          labels = [];
  
   

    for (var i = 0; i < magnitudes.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(magnitudes[i] + 1) + '">&nbsp&nbsp&nbsp&nbsp</i> ' +
            magnitudes[i] + (magnitudes[i + 1] ? '&ndash;' + magnitudes[i + 1] + '<br>' : '+');
    }
      return div;
  };

legend.addTo(myMap);
  