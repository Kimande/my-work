document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling for navigation links
    document.querySelectorAll(".navbar a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetElement = document.querySelector(this.getAttribute("href"));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
            document.querySelector(".navbar").classList.remove("active"); // Close mobile menu
        });
    });

    // Mobile menu toggle
    const menuIcon = document.getElementById("menu-icon");
    const navbar = document.querySelector(".navbar");
    menuIcon.addEventListener("click", function () {
        this.classList.toggle("active");
        navbar.classList.toggle("active");
    });

    // Form submission handler
    const contactForm = document.getElementById("contact-form");
    const responseMessage = document.getElementById("response-message");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const message = document.getElementById("message").value;
            
            // Simulated success response
            responseMessage.textContent = "Message sent successfully! 🚀";
            responseMessage.style.color = "#64ffda";
            this.reset();
            setTimeout(() => { responseMessage.textContent = ""; }, 3000);

            // SMS API Integration (Infobip)
            const yourPhoneNumber = "+254110891892"; 
            const apiKey = "84b7e97c2ce2070bf5a9b4a43a089350-3b024839-63e4-4183-ab34-f6f6c75cbca2";
            fetch("https://69wj5z.api.infobip.com/sms/1/text/single", {
                method: "POST",
                headers: { "Authorization": `App ${apiKey}`, "Content-Type": "application/json" },
                body: JSON.stringify({ from: "Purity", to: yourPhoneNumber, text: `Message from ${name}: ${message}` })
            })
            .then(response => response.json())
            .then(data => console.log("SMS Response:", data))
            .catch(error => console.error("SMS Error:", error));
        });
    }

    // CV Download Functionality
    const cvButton = document.querySelector(".btn");
    if (cvButton) {
        cvButton.addEventListener("click", function (event) {
            event.preventDefault();
            window.open("PurityKimande_CV.pdf", "_blank");
        });
    }

    // Social Media Links - Open in a New Tab
    document.querySelectorAll(".social-media a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const url = this.getAttribute("href").replace("#", "");
            if (url) window.open(url, "_blank");
        });
    });

    // Scroll Reveal Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll("section").forEach(section => observer.observe(section));
});
