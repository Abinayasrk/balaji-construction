const reveals = document.querySelectorAll(
    '.reveal-left, .reveal-right, .reveal-up'
);

const observer = ('IntersectionObserver' in window)
    ? new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add('show');

            // Stop observing after first reveal
            observer.unobserve(entry.target);
        }

    });
        }, {
            threshold: 0.3
        })
    : null;

if (observer) {
    reveals.forEach(el => observer.observe(el));
} else {
    reveals.forEach(el => el.classList.add('show'));
}


/* ===========================
   MOBILE MENU
=========================== */

/* ===========================
   MOBILE MENU — FINAL FIX
   Header is loaded dynamically, so bind after header appears.
=========================== */

function getMobileNavElements() {
    const header = document.querySelector("#header") || document;
    const navLinks = header.querySelector(".nav-links");
    const menuBtn = header.querySelector(".menu-btn, .hamburger");

    return {
        navLinks: navLinks,
        menuBtn: menuBtn
    };
}

function closeMobileMenu() {
    const elements = getMobileNavElements();

    if (!elements.navLinks) return;

    elements.navLinks.classList.remove("active");

    if (elements.menuBtn) {
        elements.menuBtn.setAttribute("aria-expanded", "false");
    }
}

function toggleMenu() {
    const elements = getMobileNavElements();
    const navLinks = elements.navLinks;

    if (!navLinks) return;

    const willOpen = !navLinks.classList.contains("active");

    navLinks.classList.toggle("active", willOpen);

    if (elements.menuBtn) {
        elements.menuBtn.setAttribute(
            "aria-expanded",
            willOpen ? "true" : "false"
        );
    }
}

/* Make the function available to header onclick handlers. */
window.toggleMenu = toggleMenu;

/* Header is inserted with fetch(), so watch for it and bind safely. */
function bindMobileMenu() {

    const elements = getMobileNavElements();

    if (!elements.navLinks || !elements.menuBtn) return;

    if (elements.menuBtn.dataset.mobileMenuBound === "true") return;

    elements.menuBtn.dataset.mobileMenuBound = "true";
    elements.menuBtn.setAttribute("aria-expanded", "false");

    elements.menuBtn.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        toggleMenu();
    });

    elements.navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            closeMobileMenu();
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {

    bindMobileMenu();

    const header = document.querySelector("#header");

    if (header && "MutationObserver" in window) {

        const headerObserver = new MutationObserver(function () {
            bindMobileMenu();
        });

        headerObserver.observe(header, {
            childList: true,
            subtree: true
        });
    }

    document.addEventListener("click", function (event) {

        const headerElement = document.querySelector("#header");

        if (!headerElement) return;

        const navLinks =
            headerElement.querySelector(".nav-links");

        const menuBtn =
            headerElement.querySelector(".menu-btn, .hamburger");

        if (
            navLinks &&
            navLinks.classList.contains("active") &&
            !navLinks.contains(event.target) &&
            !menuBtn?.contains(event.target)
        ) {
            closeMobileMenu();
        }

    });

    window.addEventListener("resize", function () {

        if (window.innerWidth > 768) {
            closeMobileMenu();
        }

    });

});


/* ===========================
   COUNTER ANIMATION
=========================== */

const counters = document.querySelectorAll(".counter");

const statsObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;
            const target = +counter.dataset.target;

            let count = 0;

            const update = () => {

                const increment = Math.ceil(target / 100);

                if (count < target) {

                    count += increment;

                    if (count > target) {
                        count = target;
                    }

                    counter.innerText = count;

                    setTimeout(update, 20);

                } else {

                    counter.innerText = target + "+";

                }

            };

            update();

            statsObserver.unobserve(counter);
        }

    });

}, {
    threshold: 0.5
});

counters.forEach(counter => {
    statsObserver.observe(counter);
});


/* ===========================
   PROJECT CAROUSEL
=========================== */

if (
    document.querySelector(".projectSwiper") &&
    typeof Swiper !== "undefined"
) {

    const swiper = new Swiper(".projectSwiper", {

        loop: true,

        spaceBetween: 25,

        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        breakpoints: {

            0: {
                slidesPerView: 1,
            },

            768: {
                slidesPerView: 2,
            },

            1024: {
                slidesPerView: 3,
            }

        }

    });

}


/* ===========================
   SERVICE TABS
=========================== */

const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {

    button.addEventListener("click", () => {

        tabButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        tabContents.forEach(content => {
            content.classList.remove("active");
        });

        button.classList.add("active");

        const target = document.getElementById(
            button.dataset.tab
        );

        if (target) {
            target.classList.add("active");
        }

    });

});


/* ===========================
   FAQ ACCORDION
=========================== */

const faqs = document.querySelectorAll(".faq-item");

faqs.forEach(faq => {

    const question = faq.querySelector(".faq-question");

    if (!question) return;

    question.addEventListener("click", () => {

        const isActive = faq.classList.contains("active");

        faqs.forEach(item => {

            item.classList.remove("active");

            const icon = item.querySelector(".faq-icon");

            if (icon) {

                icon.classList.remove("fa-minus");

                icon.classList.add("fa-plus");

            }

        });

        if (!isActive) {

            faq.classList.add("active");

            const icon = faq.querySelector(".faq-icon");

            if (icon) {

                icon.classList.remove("fa-plus");

                icon.classList.add("fa-minus");

            }

        }

    });

});


/* ===========================
   PROJECT FILTER
=========================== */

const filterButtons =
    document.querySelectorAll(".projects-filter-btn");

const projectCards =
    document.querySelectorAll(".featured-project-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter =
            button.getAttribute("data-filter");

        projectCards.forEach(card => {

            if (
                filter === "*" ||
                card.classList.contains(
                    filter.replace(".", "")
                )
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});


/* ===========================
   PROJECT GALLERY SWIPER
=========================== */

if (
    document.querySelector(".gallerySwiper") &&
    typeof Swiper !== "undefined"
) {

    const gallerySwiper =
        new Swiper(".gallerySwiper", {

            loop: false,

            spaceBetween: 30,

            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },

            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },

            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },

            breakpoints: {

                0: {
                    slidesPerView: 1,
                },

                768: {
                    slidesPerView: 2,
                },

                1024: {
                    slidesPerView: 3,
                }

            }

        });

}


/* ===========================
   PROJECT GALLERY POPUP
=========================== */

const modal =
    document.querySelector(".gallery-modal");

const modalImg =
    document.getElementById("modalImage");

const modalTitle =
    document.getElementById("modalTitle");

const modalLocation =
    document.getElementById("modalLocation");

const modalArea =
    document.getElementById("modalArea");

const modalStatus =
    document.getElementById("modalStatus");

const modalCategory =
    document.getElementById("modalCategory");

const modalDescription =
    document.getElementById("modalDescription");

const modalMaterials =
    document.getElementById("modalMaterials");

const galleryCards =
    document.querySelectorAll(".gallery-card");


galleryCards.forEach(card => {

    card.addEventListener("click", () => {

        if (!modal) return;

        modal.classList.add("active");

        const image = card.querySelector("img");

        if (modalImg && image) {
            modalImg.src = image.src;
        }

        if (modalTitle) {
            modalTitle.innerText =
                card.dataset.title || "";
        }

        if (modalLocation) {
            modalLocation.innerText =
                card.dataset.location || "";
        }

        if (modalArea) {
            modalArea.innerText =
                card.dataset.area || "";
        }

        if (modalStatus) {
            modalStatus.innerText =
                card.dataset.status || "";
        }

        if (modalCategory) {
            modalCategory.innerText =
                card.dataset.category || "";
        }

        if (modalDescription) {
            modalDescription.innerText =
                card.dataset.description || "";
        }

        if (modalMaterials) {
            modalMaterials.innerText =
                card.dataset.materials || "";
        }

    });

});


/* ===========================
   CLOSE GALLERY POPUP
=========================== */

const galleryClose =
    document.querySelector(".gallery-close");

if (galleryClose && modal) {

    galleryClose.onclick = () => {

        modal.classList.remove("active");

    };

}


window.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.classList.remove("active");

    }

});


/* ===========================
   ESCAPE KEY
=========================== */

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape" && modal) {

        modal.classList.remove("active");

    }

});

/* =========================================================
   BRANDS WE TRUST — CAROUSEL ENHANCEMENT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const brandsCarousel =
        document.querySelector(".brands-carousel");

    const brandsTrack =
        document.querySelector(".brands-track");

    if (!brandsCarousel || !brandsTrack) {
        return;
    }

    /* Pause animation when touch starts; resume after touch ends. */
    brandsCarousel.addEventListener(
        "touchstart",
        () => {
            brandsTrack.style.animationPlayState = "paused";
        },
        { passive: true }
    );

    brandsCarousel.addEventListener(
        "touchend",
        () => {
            brandsTrack.style.animationPlayState = "";
        },
        { passive: true }
    );

    /* Respect reduced-motion preference. */
    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    const updateMotion = () => {

        if (reducedMotion.matches) {

            brandsTrack.style.animation =
                "none";

        } else {

            brandsTrack.style.animation = "";

        }

    };

    updateMotion();

    if (reducedMotion.addEventListener) {
        reducedMotion.addEventListener(
            "change",
            updateMotion
        );
    }

});
