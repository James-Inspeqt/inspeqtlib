document.addEventListener('DOMContentLoaded', function() {
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
  // Get the checkboxes and radio buttons
  const checkbox1 = document.getElementById('checkbox1');
  const checkbox2 = document.getElementById('checkbox2');
  const checkbox3 = document.getElementById('checkbox3');
  const radioSelector1 = document.getElementById('radioSelector1');
  const radioSelector2 = document.getElementById('radioSelector2');

  // Get the "Next" buttons
  const nextButton1 = document.getElementById('nextButton1');
  const nextButton2 = document.getElementById('nextButton2');
  const nextButton3 = document.getElementById('nextButton3');
  const nextButton4 = document.getElementById('nextButton4');
  const nextButton5 = document.getElementById('nextButton5');
  const nextButton6 = document.getElementById('nextButton6');
  
    // Get the "Back" buttons
  const backButton2 = document.getElementById('backButton2');
  const backButton3 = document.getElementById('backButton3');
  const backButton4 = document.getElementById('backButton4');
  const backButton5 = document.getElementById('backButton5');
  const backButton6 = document.getElementById('backButton6');
  const backButton7 = document.getElementById('backButton7');
  
  // Add event listeners to the "Next" buttons
  nextButton1.addEventListener('click', function() {
    document.getElementById('step1').style.display = 'none';
    if (checkbox1.checked || checkbox2.checked) {
      // If Checkbox 1 or Checkbox 2 is checked, go to Step 2
      document.getElementById('step2').style.display = 'block';
      document.getElementById('step3').style.display = 'none'; // Hide Step 3
    } else if (checkbox3.checked) {
      // If only Checkbox 3 is checked, go to Step 3
      document.getElementById('step3').style.display = 'block';
    } else {
      // If no checkbox is checked, go directly to Step 4
      document.getElementById('step4').style.display = 'block';
    }
  });

  backButton2.addEventListener('click', function() {
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step1').style.display = 'block';
  });

  nextButton2.addEventListener('click', function() {
    document.getElementById('step2').style.display = 'none';
    if (!checkbox3.checked) {
      // If Checkbox 3 is not checked, skip Step 3 and go to Step 4
      document.getElementById('step4').style.display = 'block';
    } else {
      // If Checkbox 3 is checked, go to Step 3
      document.getElementById('step3').style.display = 'block';
    }
  });

  backButton3.addEventListener('click', function() {
    document.getElementById('step3').style.display = 'none';
    if (checkbox1.checked || checkbox2.checked) {
      // If Checkbox 2 en/or 3 is checked, go back to step 2
      document.getElementById('step2').style.display = 'block';
    } else {
      // If Checkbox 3 is checked, go to Step 3
      document.getElementById('step1').style.display = 'block';
    }
  });

  nextButton3.addEventListener('click', function() {
    // Show Step 4 when clicking "Next" in Step 3
    document.getElementById('step3').style.display = 'none';
    document.getElementById('step4').style.display = 'block';
  });

	backButton4.addEventListener('click', function() {
    document.getElementById('step4').style.display = 'none';
    if (checkbox3.checked) {
        // If Checkbox 3 is checked, go back to step 3
        document.getElementById('step3').style.display = 'block';
    } else {
        if (checkbox1.checked || checkbox2.checked) {
            // If Checkbox 1 or Checkbox 2 is checked, go back to step 2
            document.getElementById('step2').style.display = 'block';
        } else {
            // If nothing is checked, go back to step 1
            document.getElementById('step1').style.display = 'block';
        }
    }
});

  
  nextButton4.addEventListener('click', function() {
    // Show Step 5 when clicking "Next" in Step 4
    document.getElementById('step4').style.display = 'none';
    document.getElementById('step5').style.display = 'block';
  });
  
  backButton5.addEventListener('click', function() {
    // Show Step 4 when clicking "Next" in Step 5
    document.getElementById('step5').style.display = 'none';
    document.getElementById('step4').style.display = 'block';
  });
  
  nextButton5.addEventListener('click', function() {
    if (radioSelector1.checked) {
      // If Radio Selector 1 is checked, go to Step 6
      document.getElementById('step5').style.display = 'none';
      document.getElementById('step6').style.display = 'block';
    } else if (radioSelector2.checked) {
      // If Radio Selector 2 is checked, go to Submit Section
      document.getElementById('step5').style.display = 'none';
      document.getElementById('submitSectionDown').style.display = 'block';
			document.getElementById('submitSectionUp').style.display = 'block';
    }
    // If nothing is selected, do nothing (the current step remains visible) 
  });

    nextButton6.addEventListener('click', function() {
    // Show Step 5 when clicking "Next" in Step 4
    document.getElementById('step6').style.display = 'none';
    document.getElementById('submitSectionDown').style.display = 'block';
    document.getElementById('submitSectionUp').style.display = 'block';
  });
});
