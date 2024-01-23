document.addEventListener('DOMContentLoaded', function() {
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
