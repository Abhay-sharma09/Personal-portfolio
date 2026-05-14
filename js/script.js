document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("main section");

    menuToggle?.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        const icon = menuToggle.querySelector("i");
        icon?.classList.toggle("fa-bars");
        icon?.classList.toggle("fa-times");
    });

    navItems.forEach((item) => {
        item.addEventListener("click", () => {
            navLinks.classList.remove("active");
            const icon = menuToggle?.querySelector("i");
            icon?.classList.remove("fa-times");
            icon?.classList.add("fa-bars");
        });
    });

    function updateActiveNav() {
        header.classList.toggle("scrolled", window.scrollY > 8);

        let current = "home";
        sections.forEach((section) => {
            if (window.scrollY >= section.offsetTop - 140) {
                current = section.id;
            }
        });

        navItems.forEach((item) => {
            item.classList.toggle("active", item.getAttribute("href") === `#${current}`);
        });
    }

    updateActiveNav();
    window.addEventListener("scroll", updateActiveNav);
});
