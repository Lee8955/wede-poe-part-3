// Wait until the whole HTML page has loaded before running any JavaScript
// This stops errors like "cannot find element" because the page isn't ready yet
document.addEventListener('DOMContentLoaded', () => {

  // --- 1. HAMBURGER MENU (for mobile) ---
  // Find the hamburger button and the nav menu
  const hamburger = document.querySelector('.hamburger');
  const navUl = document.querySelector('nav ul');
  // Only run if both exist on this page (some pages don't have them)
  if (hamburger && navUl) {
    // When user clicks hamburger, show/hide the menu
    hamburger.addEventListener('click', () => {
      navUl.classList.toggle('open');
    });
  }

  // --- 2. PROGRAMME SEARCH (on Programmes page) ---
  // Find the search box
  const searchInput = document.getElementById('programmeSearch');
  if (searchInput) {
    // Every time user types a letter, run this
    searchInput.addEventListener('input', (e) => {
      // Get what user typed and make it lowercase so search is not case-sensitive
      const term = e.target.value.toLowerCase();
      // Get all programme cards
      const cards = document.querySelectorAll('.programme-card');
      // Loop through each card
      cards.forEach(card => {
        // Get all text inside the card in lowercase
        const text = card.textContent.toLowerCase();
        // If card text contains the search term, show it, otherwise hide it
        card.style.display = text.includes(term) ? 'block' : 'none';
      });
    });
  }

  // --- 3. GALLERY LIGHTBOX (on Gallery page) ---
  // Find all gallery images, the lightbox popup, and the big image inside it
  const galleryImgs = document.querySelectorAll('.gallery img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  // Only run if gallery exists on this page
  if (galleryImgs.length && lightbox && lightboxImg) {
    // When user clicks a small image...
    galleryImgs.forEach(img => {
      img.addEventListener('click', () => {
        // Put that image into the big lightbox image
        lightboxImg.src = img.src;
        // Show the lightbox by adding the 'active' class
        lightbox.classList.add('active');
      });
    });
    // When user clicks anywhere on the lightbox, close it
    lightbox.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });
  }

  // --- 4. ENQUIRY FORM VALIDATION (on Enquiry page) ---
  // Find the form
  const enquiryForm = document.getElementById('enquiryForm');
  if (enquiryForm) {
    // When user tries to submit the form...
    enquiryForm.addEventListener('submit', (e) => {
      // Start by assuming form is valid
      let valid = true;
      // Get the name, email inputs and their error message spots
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');

      // Check NAME: must be at least 2 characters
      if (name.value.trim().length < 2) {
        // .trim() removes spaces, so "  " doesn't count as a name
        nameError.textContent = 'Please enter at least 2 characters';
        nameError.classList.add('show'); // Show the error message
        valid = false; // Mark form as invalid
      } else {
        nameError.classList.remove('show'); // Hide error if name is now ok
      }

      // Check EMAIL: must look like name@example.com
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value)) {
        emailError.textContent = 'Please enter a valid email address';
        emailError.classList.add('show');
        valid = false;
      } else {
        emailError.classList.remove('show');
      }

      // If anything was invalid, stop the form from submitting
      if (!valid) {
        e.preventDefault();
      } else {
        // If everything is valid, stop normal submit, show thank you, and clear form
        e.preventDefault();
        alert('Thank you! Your enquiry has been submitted. We will contact you within 24 hours.');
        enquiryForm.reset();
      }
    });
  }

  // --- 5. LEAFLET MAP (on Contact page) ---
  // Only run if there is a <div id="map"> on this page
  // This is what was missing - this creates the map in the orange box
  const mapDiv = document.getElementById('map');
  if (mapDiv) {
    // Create map, centre it on Alexandra, Johannesburg, zoom level 14
    var map = L.map('map').setView([-26.1035, 28.0925], 14);

    // Load the actual map pictures (tiles) from OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(map);

    // Drop a pin (marker) on Bright Futures Trust location
    L.marker([-26.1035, 28.0925]).addTo(map)
      .bindPopup('<b>Bright Futures Community Trust</b><br>12th Avenue Community Hall<br>Alexandra, Johannesburg')
      .openPopup(); // Open the popup straight away
  }
});

// --- 6. ACCORDION (FAQ / expandable sections) ---
// This is OUTSIDE DOMContentLoaded, so it runs immediately
// Find every accordion button
document.querySelectorAll('.accordion-btn').forEach(btn => {
  // When user clicks a button...
  btn.addEventListener('click', () => {
    // The content is the next element after the button
    const content = btn.nextElementSibling;
    // Check if this one is already open
    const isActive = content.classList.contains('active');

    // Close ALL accordions first
    document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('active'));
    // Reset all + / - signs to +
    document.querySelectorAll('.accordion-btn span').forEach(s => s.textContent = '+');

    // If the one we clicked was closed, open it now
    if (!isActive) {
      content.classList.add('active');
      btn.querySelector('span').textContent = '-'; // Change + to -
    }
  });
});