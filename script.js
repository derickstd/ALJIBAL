// Change Navbar Color on Scroll
window.addEventListener('scroll', function() {
    let navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".phone-number").forEach(phone => {
        phone.addEventListener("click", function(event) {
            event.preventDefault();
            let number = this.getAttribute("data-number");
            let isWhatsApp = confirm("Is this a WhatsApp number? Click OK for WhatsApp, Cancel for a normal call.");
            
            if (isWhatsApp) {
                window.open(`https://wa.me/${number.replace(/\D/g, '')}`, "_blank");
            } else {
                window.location.href = `tel:${number}`;
            }
        });
    });

    function twinkleText() {
        let colors = ['#ff0000', '#00ff00', '#0000ff', '#ff9900'];
        let index = 0;
        setInterval(() => {
            document.getElementById('twinkling-text').style.color = colors[index];
            index = (index + 1) % colors.length;
        }, 500);
    }
    twinkleText();
});

const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

setInterval(nextSlide, 4000); 


document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".containe").style.opacity = 0;
    setTimeout(() => {
        document.querySelector(".containe").style.transition = "opacity 2s";
        document.querySelector(".containe").style.opacity = 1;
    }, 500);
});


document.addEventListener("DOMContentLoaded", function() {
    let container = document.getElementById("clientContainer");
    setInterval(() => {
        container.style.transform = `translateY(${Math.random() * 10 - 5}px)`;
    }, 1000);
});


document.addEventListener("DOMContentLoaded", function () {
    const leftImages = document.querySelector(".left");
    const rightImages = document.querySelector(".right");

    function animateImages() {
        leftImages.style.transitionDuration = "3s"; // Change time dynamically
        rightImages.style.transitionDuration = "3s"; // Change time dynamically

        leftImages.style.transform = "translateX(0)";
        leftImages.style.opacity = "1";

        rightImages.style.transform = "translateX(0)";
        rightImages.style.opacity = "1";
    }

    window.addEventListener("scroll", function () {
        const sectionPosition = document.querySelector(".freight-section").offsetTop;
        const scrollPosition = window.scrollY + window.innerHeight;

        if (scrollPosition > sectionPosition + 100) {
            animateImages();
        }
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const teamMembers = document.querySelectorAll(".team-member");
    teamMembers.forEach(member => {
        member.addEventListener("mouseenter", () => {
            member.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.3)";
        });
        member.addEventListener("mouseleave", () => {
            member.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        });
    });
});
