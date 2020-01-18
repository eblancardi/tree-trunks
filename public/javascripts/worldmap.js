
jQuery(document).ready(function() {
  jQuery('#vmap').vectorMap({ map: 'world_en',

backgroundColor: '#a5bfdd',

borderColor: '#818181',
borderOpacity: 0.25,
borderWidth: 1,
color: '#ECE0F8',
enableZoom: true,
hoverColor: '#c9dfaf',
hoverOpacity: null,
normalizeFunction: 'linear',
scaleColors: ['#b6d6ff', '#005ace'],
selectedColor: '#c9dfaf',
selectedRegions: null,
showTooltip: true,
onRegionClick: function(element, code, region)
{
    var message = 'You clicked '
        + region
        + ' which has the following : '
        + 

      axios
      .get(`/listtrees?country=${encodeURIComponent(region)}`)
        .then(response => {
          //should return a json file
          console.log('response from back', response.data);
        });
    alert(message);
}
   });
});

