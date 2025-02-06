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



document.addEventListener("DOMContentLoaded", function () {
    const heroContent = document.querySelector(".hero-content");
    heroContent.style.opacity = "1";
    heroContent.style.transform = "translateY(1)";
});


document.addEventListener("DOMContentLoaded", function() {
    const aboutSection = document.querySelector(".about-us");
    aboutSection.style.opacity = "0";
    setTimeout(() => {
        aboutSection.style.transition = "opacity 1.7s ease-in-out";
        aboutSection.style.opacity = "1";
    }, 500);
    
    const animatedImage = document.getElementById("animatedImage");
    let scale = 2;
    setInterval(() => {
        scale = scale === 1 ? 1.07 : 1;
        animatedImage.style.transform = `scale(${scale})`;
    }, 2000);
});



