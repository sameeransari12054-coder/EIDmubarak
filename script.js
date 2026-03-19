// script.js

// Wait for the HTML document to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {

    // --- Configuration ---
    // !!! IMPORTANT: List the filenames of the photos you put in your 'images' folder !!!
    const imageFilenames = [
       'image1.png',
       'photo2.png',
       'photo2.png',
       'photo2.png',
        // Add or remove filenames as needed. Make sure the names match exactly.
    ];

    // --- Get references to HTML elements ---
    const gallerySlider = document.getElementById('gallerySlider');
    const galleryDots = document.getElementById('galleryDots');
    let currentIndex = 0; // Tracks which image is currently being shown

    // --- Function to load images into the gallery ---
    function loadImages() {
        // Clear any existing content just in case
        gallerySlider.innerHTML = '';
        galleryDots.innerHTML = '';

        // Loop through each filename in our list
        imageFilenames.forEach(filename => {
            // Create an img element
            const img = document.createElement('img');
            // Set its source to the path inside the images folder
            img.src = `images/${filename}`;
            // Set the alt text (good for accessibility)
            img.alt = `Eid Memory ${filename}`;
            // Add the CSS class to style it
            img.classList.add('gallery-image');

            // Optional: Handle case where image might not load
            img.onerror = function() {
                console.error(`Error loading image: ${filename}`);
                this.style.backgroundColor = '#1a2f3f'; // Show a placeholder color
                this.alt = 'Image not found';
            };

            // Add the image to the slider
            gallerySlider.appendChild(img);
        });

        // After adding images, create the navigation dots
        createDots();

        // If there are images, show the first one
        if (imageFilenames.length > 0) {
            showSlide(currentIndex);
        } else {
            // Handle case with no images
            gallerySlider.innerHTML = '<p style="padding: 50px; text-align: center;">No memories added yet. 💖</p>';
        }
    }

    // --- Function to create the dot indicators ---
    function createDots() {
        for (let i = 0; i < imageFilenames.length; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            // Add a click event to each dot to jump to that slide
            dot.addEventListener('click', () => {
                currentIndex = i;
                showSlide(currentIndex);
            });
            galleryDots.appendChild(dot);
        }
    }

    // --- Function to display a specific slide ---
    function showSlide(index) {
        const images = document.querySelectorAll('.gallery-image');
        const dots = document.querySelectorAll('.dot');

        // If there are no images, do nothing
        if (images.length === 0) return;

        // Handle index boundaries (loop around)
        if (index >= images.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = images.length - 1;
        } else {
            currentIndex = index;
        }

        // Calculate how much to shift the slider
        // We shift by -100% * currentIndex
        const shiftAmount = -currentIndex * 100; // in percentage
        gallerySlider.style.transform = `translateX(${shiftAmount}%)`;

        // Update the active state of the dots
        dots.forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // --- Make the changeSlide function globally available for the button clicks ---
    // (Because the buttons in HTML use onclick="changeSlide()")
    window.changeSlide = function(direction) {
        showSlide(currentIndex + direction);
    };

    // --- Start the whole process by loading the images ---
    loadImages();

});