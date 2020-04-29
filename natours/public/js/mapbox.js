/* eslint-disable */

const locations = JSON.parse(document.getElementById('map').dataset.locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoiaXVsaWFuY2FybmFydSIsImEiOiJjazlsZWIxOTkwNTNwM2twYm1xaml2MWUwIn0.Fhyt0qNKjpqT4WWfJPZGoQ';

let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/iuliancarnaru/ck9lefrzz0scw1iml25iyxuky',
  scrollZoom: false,
  // center: [-118.113491, 34.111745],
  // zoom: 10,
  // interactive: false,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((location) => {
  // create marker
  const element = document.createElement('div');
  element.className = 'marker';

  // add marker
  new mapboxgl.Marker({
    element,
    anchor: 'bottom',
  })
    .setLngLat(location.coordinates)
    .addTo(map);

  // add popup
  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(location.coordinates)
    .setHTML(`<p>Day ${location.day} ${location.description}</p>`)
    .addTo(map);

  // extend map bound to include the markers
  bounds.extend(location.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});
