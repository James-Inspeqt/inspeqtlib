let autocomplete;
let map; // Declare a variable for the map
let marker; // Declare a variable for the marker

function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
    document.querySelector('input[ms-code-input="address"]'),
    {
      componentRestrictions: { country: ['NL'] },
      fields: ['address_components', 'geometry'], // Include geometry to get location information
      types: ['address']
    }
  );

  autocomplete.addListener('place_changed', function() {
    const place = autocomplete.getPlace();

    if (place) {
      const addressInput = document.querySelector('input[ms-code-input="address"]');
      const cityInput = document.querySelector('input[ms-code-input="city"]');
      const regionInput = document.querySelector('input[ms-code-input="region"]');
      const countryInput = document.querySelector('input[ms-code-input="country"]');
      const postalCodeInput = document.querySelector('input[ms-code-input="postal-code"]');

      addressInput.value = extractAddress(place);
      cityInput.value = extractCity(place);
      regionInput.value = extractRegion(place);
      countryInput.value = extractCountry(place);
      postalCodeInput.value = extractPostalCode(place);

      // Center the map on the selected location
      if (place.geometry && place.geometry.location) {
        updateMap(place.geometry.location);
      }
    }
  });
}

function extractAddress(place) {
  let address = '';
  const route = extractComponent(place, 'route');
  const streetNumber = extractComponent(place, 'street_number');

  if (route) {
    address += route;

    // Add a space between street name and street number if both exist
    if (streetNumber) {
      address += ' ' + streetNumber;
    }
  } else if (streetNumber) {
    address += streetNumber;
  }

  return address.trim();
}

function extractComponent(place, componentType) {
  for (const component of place.address_components) {
    if (component.types.includes(componentType)) {
      return component.long_name;
    }
  }
  return '';
}

function extractCity(place) {
  for (const component of place.address_components) {
    if (component.types.includes('locality')) {
      return component.long_name;
    }
  }
  return '';
}

function extractRegion(place) {
  for (const component of place.address_components) {
    if (component.types.includes('administrative_area_level_1')) {
      return component.long_name;
    }
  }
  return '';
}

function extractCountry(place) {
  for (const component of place.address_components) {
    if (component.types.includes('country')) {
      return component.long_name;
    }
  }
  return '';
}

function extractPostalCode(place) {
  for (const component of place.address_components) {
    if (component.types.includes('postal_code')) {
      return component.long_name;
    }
  }
  return '';
}

// Function to update the map with a new location
function updateMap(location) {
  if (!map) {
    // Create a new map if it doesn't exist
    map = new google.maps.Map(document.getElementById('map'), {
      center: location,
      zoom: 15 // You can adjust the zoom level as needed
    });

    // Create a marker at the selected location
    marker = new google.maps.Marker({
      map: map,
      position: location,
      title: 'Selected Location'
    });
  } else {
    // Check if the marker already exists
    if (!marker) {
      // Create a new marker if it doesn't exist
      marker = new google.maps.Marker({
        map: map,
        position: location,
        title: 'Selected Location'
      });
    } else {
      // Update the existing marker position
      marker.setPosition(location);
    }

    // Update the map center
    map.setCenter(location);
    map.panTo(location);
  }

  // Call the function to get driving distance and duration
  getDrivingDistance(location);
}

// Function to get driving distance and duration
function getDrivingDistance(destination) {
  const origin = new google.maps.LatLng(52.05690012297376, 4.510952538225441); // Your provided origin coordinates
  const service = new google.maps.DistanceMatrixService();

  service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: [destination],
      travelMode: 'DRIVING',
      unitSystem: google.maps.UnitSystem.METRIC,
    },
    function(response, status) {
      if (status === 'OK') {
        const distance = response.rows[0].elements[0].distance.text;
        const duration = response.rows[0].elements[0].duration.text;

        // Update HTML elements with the calculated values
        document.getElementById('distance-display').innerText = `Distance: ${distance}`;
        document.getElementById('duration-display').innerText = `Duration: ${duration}`;
      } else {
        console.error(`Error: ${status}`);
      }
    }
  );
}
