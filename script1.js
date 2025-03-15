// Function to close the login popup
function closeLoginPopup() {
    document.getElementById("loginModal").style.display = "none";
}

// Function to open the login popup
function openLoginPopup() {
    document.getElementById("loginModal").style.display = "flex";
}

// Function to show warning message first, then open login page
function openThingsBoard() {
    // Show warning alert
    alert("You must log in first to access ThingsBoard.");

    // After pressing OK, open the login popup
    openLoginPopup();
}

// Function to close the iframe when clicking outside or on the logo
function closeIframe() {
    var iframeContainer = document.getElementById("iframeContainer");
    var iframe = document.getElementById("thingsboardIframe");

    iframeContainer.style.opacity = "0"; // Fade-out effect

    // Hide the iframe container after the animation
    setTimeout(() => {
        iframeContainer.style.display = "none";
        iframe.src = ""; // Clear iframe src to stop loading content
    }, 500);
}

// Function to reload the page and reset iframe state when logo is clicked
function loadPage(page) {
    const heroContent = document.getElementById('heroContent');
    const servicesContainer = document.getElementById('servicesContainer');
    const servicesFrame = document.getElementById('servicesFrame');

    if (page === 'services') {
        if (servicesContainer.style.display === 'flex') {
            // If already open, close it and show the main content
            heroContent.style.display = 'block';
            servicesContainer.style.display = 'none';
            servicesFrame.src = ''; // Clear iframe
        } else {
            // Show the services page
            heroContent.style.display = 'none';
            servicesContainer.style.display = 'flex';
            servicesFrame.src = 'http://127.0.0.1:5500/index.html';
        }
    } else if (page === 'home') {
        // Always return to the main content when Home is clicked
        heroContent.style.display = 'block';
        servicesContainer.style.display = 'none';
        servicesFrame.src = ''; // Clear iframe
    }
}

// Ensure "Home" button in navbar cancels the services frame
document.getElementById('homeNav').addEventListener('click', function () {
    loadPage('home');
});

// Ensure "Services" button in navbar toggles the frame visibility
document.getElementById('servicesNav').addEventListener('click', function () {
    loadPage('services');
});

// Click outside to close the frame
document.addEventListener('click', function (event) {
    const servicesContainer = document.getElementById('servicesContainer');
    const servicesNav = document.getElementById('servicesNav');
    const homeNav = document.getElementById('homeNav');

    // Check if clicking outside services area and not clicking "Services" or "Home"
    if (
        servicesContainer.style.display === 'flex' &&
        !servicesContainer.contains(event.target) &&
        event.target !== servicesNav &&
        event.target !== homeNav
    ) {
        loadPage('home'); // Close the services iframe
    }
});

// Function to close the iframe when clicking outside the iframe
document.getElementById("iframeContainer").addEventListener("click", function (event) {
    if (event.target === this) {
        closeIframe(); // Close iframe if clicked outside of it
    }
});
