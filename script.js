window.addEventListener("scroll", function () {
    document.querySelectorAll(".parallax").forEach((el) => {
      let scrollPos = window.scrollY;
      el.style.transform = `translateY(${scrollPos * 0.3}px)`;
    });
  });

   //firefly script
   document.addEventListener('DOMContentLoaded', () => {
    const firefliesContainer = document.querySelector('.fireflies');
    let maxFireflies = 120;
    const isMobile = window.innerWidth <= 1024;
    const isLaptop = window.innerWidth >= 1024 &&
        window.innerWidth <= 1440 &&
        window.innerHeight <= 1080;

    if (isMobile) {
        maxFireflies = 85;
    }

    else if (isLaptop) {
        maxFireflies = 100;
    }

    let currentFireflies = 0;
    let fireflyBatchSize = 3;

    const addFirefliesBatch = () => {
        if (currentFireflies >= maxFireflies) {
            clearInterval(fireflyInterval);
            return;
        }

        for (let i = 0; i < fireflyBatchSize; i++) {
            if (currentFireflies >= maxFireflies) {
                break;
            }

            const firefly = document.createElement('div');
            firefly.className = Math.random() < 0.5 ? 'firefly' : 'orange-firefly';

            // Start with 0 opacity
            firefly.style.opacity = '0';

            firefly.style.left = `${Math.random() * 100}vw`;
            firefly.style.top = `${Math.random() * 100}vh`;

            firefly.style.setProperty('--end-x', `${Math.random() * 200 - 100}vw`);
            firefly.style.setProperty('--end-y', `${Math.random() * 200 - 100}vh`);

            if (isMobile) {
                firefly.style.animationDuration = `${10 + Math.random() * 5}s`;
            } else {
                firefly.style.animationDuration = `${10 + Math.random() * 15}s`;
            }

            firefliesContainer.appendChild(firefly);

            // Fade in the firefly
            requestAnimationFrame(() => {
                firefly.style.transition = 'opacity 1s ease-in';
                firefly.style.opacity = '0.5';
            });

            currentFireflies++;
        }
    };

    let intervalTime;

    if (isMobile) {
        intervalTime = 400; // Increase the interval time for mobile
    } else if (isLaptop) {
        intervalTime = 300; // Moderate interval for laptops
    } else {
        intervalTime = 200; // Faster interval for desktops
    }

    const fireflyInterval = setInterval(addFirefliesBatch, intervalTime);
});

// Music controls

/*const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('play-pause');
const volumeControl = document.getElementById('volume');
let isPlaying = false; // Track the playing state

// Set initial volume based on screen width
if (window.innerWidth <= 768) {
    // For mobile, set the initial volume to a higher value (e.g., 0.6)
    audio.volume = 0.6;
} else {
    // For larger screens, set the initial volume to a lower value (e.g., 0.3)
    audio.volume = 0.3;
}
volumeControl.value = audio.volume; // Ensure the slider reflects the audio's volume

// Play/Pause functionality
playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        isPlaying = true;
    } else {
        audio.pause();
        isPlaying = false;
    }
    updatePlayPauseButton(); // Update the button text
});

// Update the Play/Pause button text
function updatePlayPauseButton() {
    const buttonText = audio.paused ? "Play" : "Pause"; // Toggle between "Play" and "Pause"
    playPauseButton.textContent = buttonText;
}

// Set the initial Play button text during page load
document.addEventListener('DOMContentLoaded', () => {
    updatePlayPauseButton();
});

// Volume control functionality
volumeControl.addEventListener('input', (event) => {
    audio.volume = event.target.value; // Update the audio volume based on the slider value
});*/

let myAudio = new Audio();
myAudio.src = './music/LWA.mp3'; // Set your audio source here

// Set initial volume based on screen width
if (window.innerWidth <= 768) {
    // For mobile, set the initial volume to a higher value (e.g., 0.6)
    myAudio.volume = 0.6;
} else {
    // For larger screens, set the initial volume to a lower value (e.g., 0.3)
    myAudio.volume = 0.3;
}

let isAudioPlayed = false; // To check if the audio has played for the first time

// Game loop to check if the audio is paused and replays if necessary
function GameLoop() {
    if (myAudio.paused && isAudioPlayed) {
        myAudio.play();
    }
}

// Wait for user interaction to toggle play/pause
document.body.addEventListener('click', () => {
    if (myAudio.paused) {
        if (!isAudioPlayed) {
            myAudio.play();
            isAudioPlayed = true; // Set flag to indicate audio has been played
        } else {
            myAudio.play(); // Resume playback if it was paused
        }
    } else {
        myAudio.pause(); // Pause audio if it's currently playing
    }
});


        // Get the modal and the button
        var modal = document.getElementById("rsvpModal");
        var btn = document.getElementById("rsvpButton");
        var closeBtn = document.getElementById("closeModal");

        // When the user clicks the button, open the modal
        btn.onclick = function () {
            modal.style.display = "block";
        }

        // When the user clicks on the close button, close the modal
        closeBtn.onclick = function () {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

  