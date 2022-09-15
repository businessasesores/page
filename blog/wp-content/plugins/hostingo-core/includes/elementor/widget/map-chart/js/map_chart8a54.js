(function(jQuery) {

    "use strict";
    jQuery(document).ready(function() {
      if(!jQuery('#chartdiv').length)
      {
        return;
      }

am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create map instance
var chart = am4core.create("chartdiv", am4maps.MapChart);

// Set map definition
chart.geodata = am4geodata_worldLow;

var is_zoom = document.getElementById('is_zoom').value;
//console.log(is_zoom);
if(document.getElementById('initial_zoom').value != '')
{
  chart.homeZoomLevel = document.getElementById('initial_zoom').value;
}
else
{
  chart.homeZoomLevel = 1;
}

if(is_zoom != '')
{
   chart.chartContainer.wheelable = true; 
}
else
{
    chart.chartContainer.wheelable = false;    
}



// Set projection
chart.projection = new am4maps.projections.Miller();

// Create map polygon series
var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

// Exclude Antartica
polygonSeries.exclude = ["AQ"];

// Make map load polygon (like country names) data from GeoJSON
polygonSeries.useGeodata = true;

// Configure series
var polygonTemplate = polygonSeries.mapPolygons.template;
//polygonTemplate.tooltipText = "{name}";
var map_opacity = document.getElementById('map_opacity').value;

if (map_opacity != '') {
    polygonTemplate.polygon.fillOpacity = parseFloat(map_opacity);
}




// Create hover state and set alternative fill color
var map_color = document.getElementById('map_color').value;
var map_hover_color = document.getElementById('map_hover_color').value;

var hs = polygonTemplate.states.create("hover");

 if (map_hover_color != '') 
 {
    hs.properties.fill = map_hover_color;
 }

if (map_color != '') 
{
    polygonTemplate.fill = map_color;
} 

// Add image series
var imageSeries = chart.series.push(new am4maps.MapImageSeries());
imageSeries.mapImages.template.propertyFields.longitude = "longitude";
imageSeries.mapImages.template.propertyFields.latitude = "latitude";
imageSeries.mapImages.template.tooltipText = "{title}";

imageSeries.mapImages.template.propertyFields.url = "url";

if(document.getElementById('map_tooltip_back_color').value != '')
{
  imageSeries.tooltip.getFillFromObject = false;
  imageSeries.tooltip.background.fill = document.getElementById('map_tooltip_back_color').value;
}

if(document.getElementById('map_tooltip_text_color').value != '')
{
  imageSeries.tooltip.getFillFromObject = false;
  imageSeries.tooltip.label.fill = document.getElementById('map_tooltip_text_color').value;
}

if(document.getElementById('map_tooltip_radius').value != '')
{
   var r = document.getElementById('map_tooltip_radius').value;
  imageSeries.tooltip.background.cornerRadius = parseFloat(r);
}
var circle = imageSeries.mapImages.template.createChild(am4core.Circle);
circle.radius = 3;
circle.propertyFields.fill = "color";

var circle2 = imageSeries.mapImages.template.createChild(am4core.Circle);
circle2.radius = 3;
circle2.propertyFields.fill = "color";


circle.events.on("inited", function(event){
  animateBullet(event.target);
})


function animateBullet(circle) {
    var animation = circle.animate([{ property: "scale", from: 1, to: 5 }, { property: "opacity", from: 1, to: 0 }], 1000, am4core.ease.circleOut);
    animation.events.on("animationended", function(event){
      animateBullet(event.target.object);
    })
}

var colorSet = new am4core.ColorSet();
 

 //console.log( JSON.parse(mapdata));
 var mapdata = document.getElementById('map-data').value;
 var obj = JSON.parse(mapdata);
 var marker = [];

 jQuery.each( obj, function( key, value ) {
    var temp = {
        "title" : value.title, 
        "latitude" : parseFloat(value.latitude), 
        "longitude" : parseFloat(value.longitude), 
        "color" : value.marker_color
    };
    marker.push(temp);
 
});

 

imageSeries.data = marker;

//console.log(imageSeries.data);


}); // end am4core.ready()
  });
})(jQuery);