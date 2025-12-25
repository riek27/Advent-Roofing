<script>
// ============ DOM READY ============ //
document.addEventListener("DOMContentLoaded", () => {

    // ======= ELEMENTS ======= //
    const header = document.getElementById("main-header");
    const mobileBtn = document.getElementById("mobile-menu-toggle");
    const nav = document.getElementById("main-nav");
    const servicesDropdown = document.getElementById("services-dropdown");
    const typingEl = document.getElementById("typing");
    const animateEls = document.querySelectorAll(".animate-on-scroll");
    const leadForm = document.getElementById("lead-form");
    const contactForm = document.getElementById("contact-form");

    // ========================================================
    // 1️⃣  MOBILE MENU (FULLY FIXED + ACCESSIBLE)
    // ========================================================
    let menuOpen = false;

    function toggleMenu() {
        menuOpen = !menuOpen;
        nav.classList.toggle("active", menuOpen);
        mobileBtn.innerHTML = menuOpen
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
        document.body.classList.toggle("menu-open", menuOpen);
    }

    if (mobileBtn && nav) {
        mobileBtn.addEventListener("click", toggleMenu);

        // Close when clicking outside
        document.addEventListener("click", e => {
            if (
                menuOpen &&
                !e.target.closest("#main-nav") &&
                !e.target.closest("#mobile-menu-toggle")
            ) {
                toggleMenu();
            }
        });

        // Reset on desktop
        window.addEventListener("resize", () => {
            if (window.innerWidth > 992 && menuOpen) toggleMenu();
        });
    }

    // ========================================================
    // 2️⃣  SERVICES DROPDOWN
    // ========================================================
    if (servicesDropdown) {
        const toggleDropdown = e => {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                servicesDropdown.classList.toggle("active");
            }
        };

        servicesDropdown.addEventListener("click", toggleDropdown);

        // Desktop hover
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
    const handleScroll = () => {
        header?.classList.toggle("scrolled", window.scrollY > 80);
        animateOnScroll();
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // ========================================================
    // 4️⃣  SMOOTH SCROLL (INTERNAL LINKS ONLY)
    // ========================================================
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener("click", e => {
            const id = a.getAttribute("href").substring(1);
            const el = document.getElementById(id);
            if (!el) return;

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

        const type = () => {
            const text = phrases[p];

            typingEl.textContent = text.substring(0, c);

            if (!deleting && c < text.length) c++;
            else if (deleting && c > 0) c--;
            else {
                deleting = !deleting;
                if (!deleting) p = (p + 1) % phrases.length;
            }

            setTimeout(type, deleting ? 60 : 100);
        };

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
    // 7️⃣  FORMS — FRIENDLY RESPONSES
    // ========================================================
    function handleForm(form, message) {
        form?.addEventListener("submit", e => {
            e.preventDefault();
            alert(message);
            form.reset();
        });
    }

    handleForm(leadForm, "Thanks! We'll contact you shortly 😊");
    handleForm(contactForm, "Message received — we reply within 24 hours 👍");
});
</script>
