        // Enhanced function to detect if the device is iOS
        function isIOSDevice() {
            return /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
                (/Macintosh/i.test(navigator.userAgent) && 'ontouchend' in document);
        }

        // Slideshow effect
        let slideIndex = 0;
        function showSlides() {
            const slides = document.querySelectorAll('.slide');
            slides.forEach((slide) => {
                slide.style.display = "none";
            });
            slideIndex++;
            if (slideIndex > slides.length) { slideIndex = 1 }
            slides[slideIndex - 1].style.display = "block";
            setTimeout(showSlides, 6000); // Change image every 6 seconds (slower)
        }
        showSlides();

        // Get firefly container and fireflies
        const container = document.getElementById("firefly-container");

        // Ensure pointer events are none for the firefly container
        container.style.pointerEvents = 'none';

        const isMobile = /Mobi|Android/i.test(navigator.userAgent) ||
            isIOSDevice();

        if (!isMobile) {
            // Move the firefly container with the mouse
            document.addEventListener("mousemove", (e) => {
                const mouseX = e.clientX; // Use clientX to get the mouse position within the browser window
                const mouseY = e.clientY; // Use clientY to get the mouse position within the browser window

                // Update position of the container
                container.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
            });
        } else {
            // Optional: You can hide the firefly container entirely on mobile devices to avoid performance issues.
            container.style.display = 'none';
        }

        // Scroll effect to reveal sections with improved fade-out handling
        const sections = document.querySelectorAll('.section');
        const windowHeight = window.innerHeight;

        function checkSectionVisibility() {
            const scrollPosition = window.scrollY + windowHeight;

            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                // If the section is within the visible range (in view), fade it in
                if (scrollPosition >= sectionTop + sectionHeight / 4 && scrollPosition <= sectionTop + sectionHeight) {
                    if (!section.classList.contains('visible')) { // Only add class if not already added
                        section.classList.add('visible');
                    }
                } else {
                    // Optionally, you can remove the class if you want to reset the fade effect when scrolling up
                    // section.classList.remove('visible');
                }
            });
        }

        // Listen for scroll events
        window.addEventListener('scroll', function () {
            checkSectionVisibility();
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



        // Translation content
        const translations = {
            en: {
                weddingDate: "20th July 2025",
                inviteMessage: "Together with our families, we're excited to invite you to our wedding day.",
                playbutton: "Play",
                pausebutton: "Pause",
                whatToWear: {
                    title: "What to Wear",
                    message: "We want you to feel at ease during our celebration, so wear whatever makes you feel comfortable and ready to enjoy the day!",
                    comforttitle: "Comfort Above All",
                    comfort: "Our priority is for you to enjoy the day in comfort, so choose clothing that allows you to relax and have fun without any worries.",
                    freetitle: "Feel Free and Relaxed",
                    free: "Wear something that feels good and lets you move easily, so you can fully enjoy the experience!",
                    footweartitle: "Footwear & Accessories",
                    footwear: "Opt for shoes that are comfortable for walking and allow you to enjoy all the activities without discomfort. The rest is up to you!"
                },
                howToGetThere: {
                    title: "How to Get There",
                    venue: "The wedding venue is located at Singapore Zoo, S(72982). Here’s how you can get there:",
                    directions: `
                <ul>
                    <li>&#128647; / &#128663;: For detailed directions and transportation options, including MRT, bus services & car directions to the Mandai Wildlife Reserve, please refer to the official 
                    <a href="https://www.mandai.com/en/plan-your-visit/getting-to-and-around/getting-to-our-mandai-wildlife-parks.html">Getting Here page.</a> This will provide you with the most accurate and updated information for your convenience.</li>
                </ul>`,
                    arrival: `
                <p><strong>When You Arrive:</strong> Please head to the <span> Main entrance of the Night Safari </span> where you’ll be
                greeted by
                our wedding coordinators. We will gather there before boarding the tram to the tipi tent for the ceremony.</p>`,
                    arrivalNote: `
                <p><span style="font-size: 0.8em; text-decoration: none;">&#10071;</span><strong>You are highly encouraged to arrive by <span>5:45pm</span> at the entrance as the designated tram will depart at <span>6:00pm</span> to take you to the venue.</strong></p>`
                },
                schedule: {
                    title: "Schedule",
                    itinerary: "Here’s the itinerary for our special day:",
                    scheduleheader: ["Time", "Actvity"],
                    times: [
                        ["5:45 pm", "Arrival of Guests at Night Safari"],
                        ["6:00 pm", "Proceed for Tram Boarding at Station"],
                        ["6:10 pm", "Chartered Tram on the move towards Tipi Tent at East Lodge Station"],
                        ["6:15 pm", "Arrival at Tipi Tent"],
                        ["6:20 pm", "Commencement of Solemnization Ceremony"],
                        ["6:45 pm", "🐾 Animal Appearance / Tea ceremony 🍵"],
                        ["7:15 pm", "Start of the Dinner"],
                        ["9:00 pm", "Continue with the Tram Journey for Night Safari"],
                        ["9:30 pm", "End of Event"]
                    ]
                },

                rsvp: {
                    title: "RSVP",
                    rsvpmessage: "We’d love to know if you can join us! Please RSVP by [date]."
                },

                rsvpbutton: {
                    title: "RSVP HERE"
                }
            },
            zh: {
                weddingDate: "2025年7月20日",
                inviteMessage: "我们和家人一起，诚挚地邀请您参加我们的婚礼。",
                playbutton: "播放",
                pausebutton: "暂停",
                whatToWear: {
                    title: "穿着指南",
                    message: "我们希望您在庆祝活动中感到轻松自在，因此请穿上让您感到舒适并准备好享受一天的衣物！",
                    comforttitle: "舒适至上",
                    comfort: "我们的首要任务是让您在一天中的活动中感到舒适，因此请选择让您能够轻松放松、无忧无虑地享受活动的衣物。",
                    freetitle: "感到自由和放松",
                    free: "穿上让您感到舒适、能自由活动的衣物，这样您可以充分享受整个活动的体验！",
                    footweartitle: "鞋子与配饰",
                    footwear: "选择舒适的鞋子，方便行走，确保您能够舒适地参与所有活动。其他的就看您个人喜好了！"
                },
                howToGetThere: {
                    title: "如何到达",
                    venue: "婚礼场地位于新加坡动物园，S(72982)。以下是到达的方法：",
                    directions: `
                <ul>
                    <li>&#128647; / &#128663;：请参考官方的 
                    <a href="https://www.mandai.com/en/plan-your-visit/getting-to-and-around/getting-to-our-mandai-wildlife-parks.html">如何到达页面</a>，获取详细的交通指南和包括地铁、公交以及开车路线到曼达伊野生动物保护区的信息。这将为您提供最准确和最新的更新信息。</li>
                </ul>`,
                    arrival: `
                <p><strong>到达时：</strong>请前往主入口，您将在那里被我们的婚礼协调员迎接。我们将在[指定区域]聚集举行仪式。</p>`,
                    arrivalNote: `
                <p><span style="font-size: 0.8em; text-decoration: none;">&#10071;</span><strong>强烈建议您在 <span>5:45pm</span> 到达集合区，因为会有指定的电车接送您前往目的地。</strong></p>`
                },
                schedule: {
                    title: "日程安排",
                    itinerary: "以下是我们特别的一天的行程：",
                    scheduleheader: ["时间", "活动"],
                    times: [
                        ["下午5:45", "来宾到达夜间野生动物园"],
                        ["下午6:00", "到车站准备搭乘电车"],
                        ["下午6:10", "包租电车前往东帐篷站的Tipi帐篷"],
                        ["下午6:15", "到达Tipi帐篷"],
                        ["下午6:20", "婚礼证婚仪式开始"],
                        ["下午6:45", "🐾 动物亮相 / 茶道 🍵"],
                        ["下午7:15", "晚宴开始"],
                        ["下午9:00", "继续乘坐电车进行夜间野生动物园旅程"],
                        ["下午9:30", "活动结束"]
                    ]
                },
                rsvp: {
                    title: "回复邀请",
                    rsvpmessage: "我们很想知道您是否能参加！请在 [日期] 前回复您的出席信息。"
                },

                rsvpbutton: {
                    title: "在这里回复"
                }
            }
        };



        // Current language
        let currentLanguage = 'en';

        // Function to toggle language
        function toggleLanguage() {
            // Toggle language
            currentLanguage = currentLanguage === 'en' ? 'zh' : 'en';

            // Fetch translations
            const t = translations[currentLanguage];

            // Apply language class to body
            if (currentLanguage === 'zh') {
                document.body.classList.add("chinese-text"); // Apply this class when Chinese is selected
            } else {
                document.body.classList.remove("chinese-text"); // Remove the class when English is selected
            }

            // Update header
            document.querySelector("h3").innerText = t.weddingDate;
            document.querySelector("header p").innerText = t.inviteMessage;
            document.querySelector("#play-pause").innerText = t.playbutton;

            // Update "What to Wear" section
            document.querySelector("#what-to-wear h2").innerText = t.whatToWear.title;
            document.querySelector("#what-to-wear p").innerText = t.whatToWear.message;
            document.querySelectorAll(".wear-category").forEach((category, index) => {
                const headings = [t.whatToWear.comforttitle, t.whatToWear.freetitle, t.whatToWear.footweartitle];
                const paragraphs = [t.whatToWear.comfort, t.whatToWear.free, t.whatToWear.footwear];
                category.querySelector("h3").innerText = headings[index]; // Translate heading
                category.querySelector("p").innerText = paragraphs[index]; // Translate paragraph
            });

            // Update title
            document.querySelector("#how-to-get-there h2").innerText = t.howToGetThere.title;

            // Update venue
            document.querySelectorAll("#how-to-get-there p")[0].innerHTML = t.howToGetThere.venue; // Target the first <p>

            // Update directions (ul)
            document.querySelector("#how-to-get-there ul").innerHTML = t.howToGetThere.directions;

            // Update arrival info
            document.querySelector(".arrival").innerHTML = t.howToGetThere.arrival;

            // Update arrival note
            document.querySelector(".arrival-note").innerHTML = t.howToGetThere.arrivalNote;



            // Update Schedule
            document.querySelector("#schedule h2").innerText = t.schedule.title;

            // Update venue
            document.querySelectorAll("#schedule p")[0].innerHTML = t.schedule.itinerary;
            const schedule = t.schedule;
            const scheduleTable = document.querySelector(".schedule-table tbody");

            // Clear existing table content
            scheduleTable.innerHTML = "";

            // Get the thead element (if exists)
            let thead = scheduleTable.closest("table").querySelector("thead");

            // If thead doesn't exist, create it and add the headers
            if (!thead) {
                thead = document.createElement("thead");
                const headerRow = document.createElement("tr");

                const timeHeader = document.createElement("th");
                timeHeader.innerText = t.schedule.scheduleheader[0];  // "时间" or "Time"
                const activityHeader = document.createElement("th");
                activityHeader.innerText = t.schedule.scheduleheader[1];  // "活动" or "Activity"

                headerRow.appendChild(timeHeader);
                headerRow.appendChild(activityHeader);
                thead.appendChild(headerRow);

                // Append the thead to the table
                scheduleTable.closest("table").prepend(thead);
            } else {
                // If thead already exists, just update its content
                const ths = thead.querySelectorAll("th");
                ths[0].innerText = t.schedule.scheduleheader[0];
                ths[1].innerText = t.schedule.scheduleheader[1];
            }

            // Loop over schedule times and create rows for tbody
            schedule.times.forEach(row => {
                const tr = document.createElement("tr");

                const timeTd = document.createElement("td");
                const activityTd = document.createElement("td");

                timeTd.innerText = row[0];  // The time in the row
                activityTd.innerText = row[1];  // The activity in the row

                tr.appendChild(timeTd);
                tr.appendChild(activityTd);
                scheduleTable.appendChild(tr);
            });

            //rsvp section
            document.querySelector("#rsvp h2").innerText = t.rsvp.title; // Update the RSVP title
            document.querySelector("#rsvp p").innerText = t.rsvp.rsvpmessage; // Update the RSVP message
            document.querySelector("#rsvpButton .button-text").innerText = t.rsvpbutton.title; // Update only the button's text

            function updateRSVPButton() {
                const rsvpButton = document.getElementById("rsvpButton");

                // Correctly target the .button-text inside the button
                const textSpan = rsvpButton.querySelector(".button-text");
                const rsvpMessage = translations[currentLanguage]?.rsvpbutton?.title || "RSVP HERE";

                if (textSpan) {
                    // Update the text inside the button while keeping the SVG
                    textSpan.textContent = rsvpMessage;
                } else {
                    console.error("RSVP button text span not found.");
                }
            }

            // Call update function if language or content needs to be updated
            updateRSVPButton(); // Use this wherever needed to update the button text dynamically

        }

        //music
        const audio = document.getElementById('audio');
        const playPauseButton = document.getElementById('play-pause');
        const volumeControl = document.getElementById('volume');

        // Update button text based on state
        function updatePlayPauseButton() {
            const text = isPlaying ? translations[currentLanguage].pause : translations[currentLanguage].play;
            playPauseButton.textContent = text;
        }

        // Set initial volume based on screen width
        if (window.innerWidth <= 768) {
            // For mobile, set the initial volume to a higher value (e.g., 0.5 or 0.6)
            audio.volume = 0.6;
        } else {
            // For larger screens, set the initial volume to a lower value (e.g., 0.2)
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

        function updatePlayPauseButton() {
            const buttonText = audio.paused
                ? translations[currentLanguage]?.playbutton || "Play"  // Show "Play" when audio is paused
                : translations[currentLanguage]?.pausebutton || "Pause";  // Show "Pause" when audio is playing
            playPauseButton.textContent = buttonText;
        }

        // Set the initial Play button text during page load
        document.addEventListener('DOMContentLoaded', () => {
            updatePlayPauseButton();
        });

        // Volume control functionality
        volumeControl.addEventListener('input', (event) => {
            audio.volume = event.target.value; // Update the audio volume based on the slider value
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


        // Only run the following code for iOS devices
        if (isIOSDevice()) {
            const sections = document.querySelectorAll('.section');

            sections.forEach((section) => {
                const backgroundImage = window.getComputedStyle(section).backgroundImage;

                if (backgroundImage && backgroundImage !== 'none') {
                    const image = document.createElement('div');

                    if (backgroundImage.includes('test3.png')) {
                        backgroundImage = 'url("Images/testmobile.png")'; // Replace with better image for section 1
                    } 

                    // Create a background image layer
                    image.style.backgroundImage = backgroundImage;
                    image.style.position = 'absolute';
                    image.style.top = '0';
                    image.style.left = '0';
                    image.style.width = '100%';
                    image.style.height = '100%';
                    image.style.zIndex = '-1'; // Layer below the section itself
                    image.style.backgroundSize = 'cover';
                    image.style.backgroundPosition = 'center';
                    image.style.backgroundRepeat = 'no-repeat';

                    // Remove the original background image
                    section.style.backgroundImage = 'none';
                    section.style.position = 'relative'; // Ensure stacking context

                    // Add the image to the section
                    section.appendChild(image);
                }

                // Ensure content is always above the overlay
                const content = section.querySelector('.content');
                if (content) {
                    content.style.position = 'relative';
                    content.style.zIndex = '2'; // Bring the content above everything
                }
            });

            // Modify body background color if needed (without using body::before directly)
            document.body.style.position = 'relative'; // Apply position to body itself
            document.body.style.zIndex = '0'; // Ensure body is in the correct stacking context

            // Instead of accessing body::before, modify the body's background color directly
            document.body.style.backgroundColor = "rgba(0, 0, 0, 0.605)"; // Set dark overlay color for iOS
        }

        // Run this code only for iOS devices
        if (isIOSDevice()) {
            const icon = document.querySelector('.icon-1');

            if (icon) {
                // Change the position of the icon (example for RSVP section)
                icon.style.position = 'absolute'; // Ensure it's absolutely positioned
                icon.style.top = '60px'; // Adjust top distance as needed (e.g. 20px from the top of the section)
                icon.style.right = '20px'; // Adjust the right side (e.g. 20px from the right of the section)
            }
        }


        // Only run the following code for iOS devices
        if (isIOSDevice()) {
            // Find the button and icon elements for specific adjustments
            const button = document.querySelector('.rsvp-button');
            const icon = document.querySelector('.icon-1');

            if (button && icon) {
                // Adjust the icon position specifically for iOS devices
                const iconPosition = window.getComputedStyle(icon).position;

                if (iconPosition === 'absolute') {
                    // Apply adjustments like top position shift for iOS devices
                    icon.style.top = '0.5%';  // Adjust the top positioning for iOS devices
                    icon.style.left = '85%'; // Modify this for horizontal positioning (right)

                    // If more dynamic adjustments are needed, tweak as per design
                    icon.style.transform = 'translateY(-50%) rotate(10deg)';
                }

                // Optionally, you could adjust other button properties here if iOS-specific quirks arise
                button.style.position = 'relative'; // Ensure button is positioned relative to adjust icon properly
            }
        }

        // Attach the toggleLanguage function to the translate button
        document.querySelector("#translateButton").addEventListener("click", toggleLanguage);