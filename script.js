document.addEventListener("DOMContentLoaded", function () {

    // ===== ELEMENT LOOKUPS (SAFE) =====
    const header = document.getElementById("main-header") || null;
    const mobileBtn = document.getElementById("mobile-menu-toggle") || null;
    const nav = document.getElementById("main-nav") || null;
    const servicesDropdown = document.getElementById("services-dropdown") || null;
    const typingEl = document.getElementById("typing") || null;
    const animateEls = document.querySelectorAll(".animate-on-scroll");
    const leadForm = document.getElementById("lead-form") || null;
    const contactForm = document.getElementById("contact-form") || null;

    // ========================================================
    // 1️⃣  MOBILE MENU
    // ========================================================
    let menuOpen = false;

    function toggleMenu() {
        if (!nav || !mobileBtn) return;

        menuOpen = !menuOpen;

        nav.classList.toggle("active", menuOpen);
        document.body.classList.toggle("menu-open", menuOpen);

        mobileBtn.innerHTML = menuOpen
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    }

    if (mobileBtn && nav) {
        mobileBtn.addEventListener("click", toggleMenu);

        document.addEventListener("click", e => {
            if (
                menuOpen &&
                !e.target.closest("#main-nav") &&
                !e.target.closest("#mobile-menu-toggle")
            ) {
                toggleMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 992 && menuOpen) toggleMenu();
        });
    }

    // ========================================================
    // 2️⃣  SERVICES DROPDOWN
    // ========================================================
    if (servicesDropdown) {
        servicesDropdown.addEventListener("click", e => {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                servicesDropdown.classList.toggle("active");
            }
        });

        servicesDropdown.addEventListener("mouseenter", () => {
            if (window.innerWidth > 992)
                servicesDropdown.classList.add("active");
        });

        servicesDropdown.addEventListener("mouseleave", () => {
            if (window.innerWidth > 992)
                servicesDropdown.classList.remove("active");
        });
    }

    // ========================================================
    // 3️⃣  HEADER SCROLL EFFECT
    // ========================================================
    function handleScroll() {
        if (header) header.classList.toggle("scrolled", window.scrollY > 80);
        animateOnScroll();
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // ========================================================
    // 4️⃣  SMOOTH SCROLL
    // ========================================================
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener("click", e => {
            const id = a.getAttribute("href").slice(1);
            const el = document.getElementById(id);

            if (!el) return; // only smooth scroll if target exists

            e.preventDefault();

            window.scrollTo({
                top: el.offsetTop - 90,
                behavior: "smooth"
            });

            if (menuOpen) toggleMenu();
        });
    });

    // ========================================================
    // 5️⃣  TYPING EFFECT
    // ========================================================
    if (typingEl) {
        const phrases = [
            "Quality Craftsmanship",
            "Reliable Solutions",
            "Expert Installation",
            "24/7 Emergency Support",
            "Premium Materials",
            "Exceptional Service"
        ];

        let p = 0, c = 0, deleting = false;

        function type() {
            const text = phrases[p];
            typingEl.textContent = text.substring(0, c);

            if (!deleting && c < text.length) c++;
            else if (deleting && c > 0) c--;
            else {
                deleting = !deleting;
                if (!deleting) p = (p + 1) % phrases.length;
            }

            setTimeout(type, deleting ? 60 : 100);
        }

        setTimeout(type, 500);
    }

    // ========================================================
    // 6️⃣  SCROLL ANIMATIONS
    // ========================================================
    function animateOnScroll() {
        animateEls.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100)
                el.classList.add("animated");
        });
    }

    animateOnScroll();

    // ========================================================
    // 7️⃣  FORMS
    // ========================================================
    function handleForm(form, message) {
        if (!form) return;
        form.addEventListener("submit", e => {
            e.preventDefault();
            alert(message);
            form.reset();
        });
    }

    handleForm(leadForm, "Thanks! We'll contact you shortly 😊");
    handleForm(contactForm, "Message received — we reply within 24 hours 👍");

});
