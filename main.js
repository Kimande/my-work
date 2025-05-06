document.addEventListener("DOMContentLoaded", function () {
    // ===== Mobile Menu Toggle =====
    const menuIcon = document.getElementById("menu-icon");
    const navbar = document.querySelector(".navbar");
    const body = document.body;

    // Toggle menu function
    function toggleMenu() {
        menuIcon.classList.toggle("active");
        navbar.classList.toggle("active");
        
        // Prevent scrolling when menu is open
        if (navbar.classList.contains("active")) {
            body.style.overflow = "hidden";
        } else {
            body.style.overflow = "";
        }
    }

    // Click on menu icon
    menuIcon.addEventListener("click", toggleMenu);

    // Close menu when clicking a nav link
    document.querySelectorAll(".navbar a").forEach(link => {
        link.addEventListener("click", function (event) {
            // Smooth scrolling
            const targetId = this.getAttribute("href");
            if (targetId.startsWith("#")) {
                event.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth" });
                }
            }

            // Close menu on mobile
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });

    // Close menu when scrolling on mobile
    window.addEventListener("scroll", () => {
        if (window.innerWidth <= 768 && navbar.classList.contains("active")) {
            toggleMenu();
        }
    });

    // ===== Form Submission =====
    const contactForm = document.getElementById("contact-form");
    const responseMessage = document.getElementById("response-message");
    
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const message = document.getElementById("message").value;
            
            // Simulate success response
            responseMessage.textContent = "Message sent successfully! 🚀";
            responseMessage.style.color = "#64ffda";
            this.reset();
            
            setTimeout(() => { 
                responseMessage.textContent = ""; 
            }, 3000);

            // SMS API Integration (Infobip)
            const yourPhoneNumber = "+254110891892"; 
            const apiKey = "84b7e97c2ce2070bf5a9b4a43a089350-3b024839-63e4-4183-ab34-f6f6c75cbca2";
            
            fetch("https://69wj5z.api.infobip.com/sms/1/text/single", {
                method: "POST",
                headers: { 
                    "Authorization": `App ${apiKey}`, 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({ 
                    from: "Purity", 
                    to: yourPhoneNumber, 
                    text: `Message from ${name}: ${message}` 
                })
            })
            .then(response => response.json())
            .then(data => console.log("SMS Response:", data))
            .catch(error => console.error("SMS Error:", error));
        });
    }

    // ===== CV Download =====
    const cvButton = document.querySelector(".btn[href$='.pdf']"); // More specific selector
    if (cvButton) {
        cvButton.addEventListener("click", function (event) {
            event.preventDefault();
            window.open(this.getAttribute("href"), "_blank");
        });
    }

    // ===== Social Media Links =====
    document.querySelectorAll(".social-media a").forEach(link => {
        link.addEventListener("click", function (event) {
            if (this.getAttribute("href").startsWith("http")) {
                event.preventDefault();
                window.open(this.getAttribute("href"), "_blank");
            }
        });
    });

    // ===== Scroll Reveal Animation =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll("section").forEach(section => {
        observer.observe(section);
    });
});
