// --- Dark Mode Toggle ---
function toggleTheme() {
    const htmlTag = document.documentElement;
    if (htmlTag.getAttribute("data-theme") === "light") {
        htmlTag.setAttribute("data-theme", "dark");
    } else {
        htmlTag.setAttribute("data-theme", "light");
    }
}

// --- Image Preview Modal (Lightbox) Logic ---

// Run this code only after the HTML has fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    
    // Find all images with the class 'tutorial-img'
    const images = document.querySelectorAll('.tutorial-img');

    // Add a click listener to each image
    images.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "flex"; // Show the modal
            modalImg.src = this.src;      // Copy the source of the clicked image to the modal
        });
    });

    // Close on Escape key press (for desktop users)
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape" && modal.style.display === "flex") {
            modal.style.display = "none";
        }
    });
});

// Function to close the modal
function closeModal(event) {
    const modal = document.getElementById("imageModal");
    // Only close if they click the 'X' or the dark background (not the image itself)
    if (event.target === modal || event.target.classList.contains('close-modal')) {
        modal.style.display = "none";
    }
}

// =========================================
//   PDF DOWNLOAD LOGIC
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('downloadPdfBtn');
    
    // Check if the button exists on the current page before adding the click event
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            
            // 1. Select the specific area of the page we want to turn into a PDF
            const element = document.getElementById('content-to-download');
            
            // 2. Temporarily change button text so the user knows it is loading
            const originalText = this.innerText;
            this.innerText = "Generating PDF...";
            this.disabled = true;

            // 3. Set the PDF formatting options
            const opt = {
                margin:       0.5, // Half-inch margin on the PDF
                filename:     'CAD-Guides-Legal-Document.pdf', // Name of the downloaded file
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2 }, // Makes the text crisp and high-res
                jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            // 4. Generate the PDF, save it, and then reset the button
            html2pdf().set(opt).from(element).save().then(() => {
                this.innerText = originalText;
                this.disabled = false;
            });
        });
    }
});

// =========================================
//   PUBLIC ANALYTICS TRACKER LOGIC
// =========================================

// 1. Fetch Total Page Views from a free Counter API
document.addEventListener('DOMContentLoaded', () => {
    // We use a free API namespace specific to your site name (kiroedge)
    fetch('https://api.counterapi.dev/v1/kiroedge/index/up')
        .then(response => response.json())
        .then(data => {
            // Update the HTML with the real total view count
            document.getElementById('viewCount').innerText = data.count.toLocaleString();
        })
        .catch(err => {
            console.error("Analytics API blocked by browser or adblocker", err);
            document.getElementById('viewCount').innerText = "Live";
        });

    // 2. Simulate Active "Live" Users (Since GitHub Pages has no WebSocket backend)
    // This randomly fluctuates the live counter slightly to give the UI a real-time feel
    setInterval(() => {
        const liveEl = document.getElementById('liveCount');
        let currentLive = parseInt(liveEl.innerText);
        
        // Randomly decide to add, subtract, or stay the same (between 1 and 4 users)
        const change = Math.floor(Math.random() * 3) - 1; 
        currentLive += change;

        if (currentLive < 1) currentLive = 1; // Never go below 1 (the person viewing it)
        if (currentLive > 5) currentLive -= 2; // Keep it realistic for a new site

        liveEl.innerText = currentLive;
    }, 15000); // Updates every 15 seconds
});

// --- Mobile Menu Toggle ---
function toggleMobileMenu() {
    const nav = document.getElementById('mainNav');
    nav.classList.toggle('active');
}
