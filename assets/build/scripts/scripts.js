// Get a reference to the body element
const body = document.querySelector('body');

// Function to add the class to the body element
function addBodyClassOnScroll() {
  // Check if the page has been scrolled vertically
  if (window.scrollY > 0) {
    // Add the desired class to the body element
    body.classList.add('scrolled');
  } else {
    // Remove the class if the page is scrolled back to the top
    body.classList.remove('scrolled');
  }
}

// Attach the scroll event listener to the window object
window.addEventListener('scroll', addBodyClassOnScroll);