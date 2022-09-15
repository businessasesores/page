(function(jQuery) {

    "use strict";
    jQuery(document).ready(function() {
      if(!jQuery('#cureved-map-chart').length)
      {
        return;
      }
am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Define marker path
var targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";

// Create map instance
var chart = am4core.create("cureved-map-chart", am4maps.MapChart);
var interfaceColors = new am4core.InterfaceColorSet();

// Set map definition
chart.geodata = am4geodata_worldLow;

// Set projection
chart.projection = new am4maps.projections.Mercator();

// Add zoom control
chart.zoomControl = new am4maps.ZoomControl();

// Set initial zoom
//chart.homeZoomLevel = 2.5;

if(document.getElementById('cur_initial_zoom') && document.getElementById('cur_initial_zoom').value != '')
{
  chart.homeZoomLevel = document.getElementById('cur_initial_zoom').value;
}
else
{
  chart.homeZoomLevel = 1;
}


if(document.getElementById('cur_initial_zoom') && document.getElementById('cur_is_zoom').value != '')
{
  chart.chartContainer.wheelable = true;      
}
else
{
  chart.chartContainer.wheelable = false;       
}


// chart.homeGeoPoint = {
//   latitude: 51,
//   longitude: -23
// };

// Create map polygon series
var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
polygonSeries.exclude = ["AQ"];
polygonSeries.useGeodata = true;
polygonSeries.mapPolygons.template.nonScalingStroke = true;

var polygonTemplate = polygonSeries.mapPolygons.template;
//polygonTemplate.tooltipText = "{name}";
var map_opacity = '';

if(document.getElementById('cur_map_opacity') && document.getElementById('cur_map_opacity').value)
{
  map_opacity = parseFloat(map_opacity);
}

if (map_opacity != '') {
    polygonTemplate.polygon.fillOpacity = parseFloat(map_opacity);
}
else{
    polygonTemplate.polygon.fillOpacity = 0.6;
}



// Create hover state and set alternative fill color
var map_color = '';
var map_hover_color = '';

if(document.getElementById('cur_map_color') && document.getElementById('cur_map_color').value)
{
  map_color = document.getElementById('cur_map_color').value;
}

if(document.getElementById('cur_map_hover_color') && document.getElementById('cur_map_hover_color').value)
{
  map_hover_color = document.getElementById('cur_map_hover_color').value;
}



  if (map_hover_color != '') 
  {
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = map_hover_color;
  }

  if (map_color != '') 
  {
      polygonTemplate.fill = map_color;
  } 


// Add images
var imageSeries = chart.series.push(new am4maps.MapImageSeries());
var imageTemplate = imageSeries.mapImages.template;
imageTemplate.tooltipText = "{title}";
imageTemplate.nonScaling = true;

var marker = imageTemplate.createChild(am4core.Sprite);
marker.path = targetSVG;
marker.horizontalCenter = "middle";
marker.verticalCenter = "middle";
marker.scale = 0.7;

if(document.getElementById('cur_marker_color') && document.getElementById('cur_marker_color').value != '')
{
  marker.fill = document.getElementById('cur_marker_color').value;
}
else
{
  marker.fill = interfaceColors.getFor("alternativeBackground");
}


imageTemplate.propertyFields.latitude = "latitude";
imageTemplate.propertyFields.longitude = "longitude";

if(document.getElementById('cur_tooltip_back_color').value != '')
{
  imageSeries.tooltip.getFillFromObject = false;
  imageSeries.tooltip.background.fill = document.getElementById('cur_tooltip_back_color').value;
}

if(document.getElementById('cur_tooltip_text_color').value != '')
{
  imageSeries.tooltip.getFillFromObject = false;
  imageSeries.tooltip.label.fill = document.getElementById('cur_tooltip_text_color').value;
}

if(document.getElementById('cur_tooltip_radius').value != '')
{
   var r = document.getElementById('cur_tooltip_radius').value;
  imageSeries.tooltip.background.cornerRadius = parseFloat(r);
}
var mapdata = '';
if(document.getElementById('curverd-map-data') && document.getElementById('curverd-map-data').value)
{
  var mapdata = document.getElementById('curverd-map-data').value;
}
else
{
  return;
}

 
 var obj = JSON.parse(mapdata);
 var marker = [];
 var line_data = [];
 var o_lat = parseFloat(document.getElementById('or_latitude').value);
 var o_lang = parseFloat(document.getElementById('or_longitude').value);
 var o_title = document.getElementById('or_title').value;

 

 jQuery.each( obj, function( key, value ) {
    var temp = {
        "title" : value.title, 
        "latitude" : parseFloat(value.latitude), 
        "longitude" : parseFloat(value.longitude), 
        "svgPath" : targetSVG
    };

    marker.push(temp);
    marker.push({
       "title" : o_title, 
        "latitude" : o_lat, 
        "longitude" : o_lang, 
        "svgPath" : targetSVG
    });

    var temp_line = {
      "multiGeoLine": [
        [
          { "latitude": o_lat, "longitude": o_lang },
          { "latitude": parseFloat(value.latitude), "longitude": parseFloat(value.longitude) }
        ]
      ]
    };

    line_data.push(temp_line);
 
});
 //console.log(marker);
imageSeries.data = marker;

// Add lines
var lineSeries = chart.series.push(new am4maps.MapLineSeries());
lineSeries.dataFields.multiGeoLine = "multiGeoLine";

var lineTemplate = lineSeries.mapLines.template;
lineTemplate.nonScalingStroke = true;
lineTemplate.arrow.nonScaling = true;

if(document.getElementById('cur_arrow_width').value != '')
{
  lineTemplate.arrow.width = document.getElementById('cur_arrow_width').value;
}
else
{
  lineTemplate.arrow.width = 5;
}

if(document.getElementById('cur_arrow_height').value != '')
{
  lineTemplate.arrow.height = document.getElementById('cur_arrow_height').value;
}
else
{
  lineTemplate.arrow.height = 6;
}



if(document.getElementById('cur_line_color').value != '')
{
  lineTemplate.stroke = document.getElementById('cur_line_color').value;  
}
else
{
  lineTemplate.stroke = interfaceColors.getFor("alternativeBackground");
}

if(document.getElementById('cur_arrow_color').value != '')
{
  lineTemplate.fill = document.getElementById('cur_arrow_color').value;  
}
else
{
  lineTemplate.fill = interfaceColors.getFor("alternativeBackground");   
}

if(document.getElementById('cur_line_opacity').value != '')
{
  lineTemplate.line.strokeOpacity = document.getElementById('cur_line_opacity').value;
}
else
{
  lineTemplate.line.strokeOpacity = 0.6;
}



lineSeries.data = line_data;

}); // end am4core.ready()


});
})(jQuery);