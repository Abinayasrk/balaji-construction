/* =========================================================
   BALAJI CONSTRUCTION — SERVICES PAGE SCRIPT
========================================================= */


/* ===========================
   SCROLL REVEAL ANIMATION
=========================== */

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

    reveals.forEach(el => {
        observer.observe(el);
    });

} else {

    reveals.forEach(el => {
        el.classList.add('show');
    });

}


/* ===========================
   MOBILE MENU
=========================== */

function toggleMenu() {

    const navLinks =
        document.querySelector(".nav-links");

    if (navLinks) {

        navLinks.classList.toggle("active");

    }

}


/* ===========================
   COUNTER ANIMATION
=========================== */

const counters =
    document.querySelectorAll(".counter");


if (counters.length && 'IntersectionObserver' in window) {

    const statsObserver =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const counter =
                        entry.target;

                    const target =
                        +counter.dataset.target;

                    let count = 0;


                    const update = () => {

                        const increment =
                            Math.ceil(target / 100);


                        if (count < target) {

                            count += increment;


                            if (count > target) {
                                count = target;
                            }


                            counter.innerText =
                                count;


                            setTimeout(
                                update,
                                20
                            );


                        } else {

                            counter.innerText =
                                target + "+";

                        }

                    };


                    update();


                    statsObserver.unobserve(
                        counter
                    );

                }

            });

        }, {
            threshold: 0.5
        });


    counters.forEach(counter => {

        statsObserver.observe(counter);

    });

}


/* ===========================
   PROJECT CAROUSEL
=========================== */

if (
    document.querySelector(".projectSwiper") &&
    typeof Swiper !== "undefined"
) {

    const swiper =
        new Swiper(".projectSwiper", {

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

                nextEl:
                    ".swiper-button-next",

                prevEl:
                    ".swiper-button-prev",

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

const tabButtons =
    document.querySelectorAll(".tab-btn");

const tabContents =
    document.querySelectorAll(".tab-content");


tabButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            tabButtons.forEach(btn => {

                btn.classList.remove(
                    "active"
                );

            });


            tabContents.forEach(content => {

                content.classList.remove(
                    "active"
                );

            });


            button.classList.add(
                "active"
            );


            const target =
                document.getElementById(
                    button.dataset.tab
                );


            if (target) {

                target.classList.add(
                    "active"
                );

            }

        }
    );

});


/* ===========================
   FAQ ACCORDION
=========================== */

const faqs =
    document.querySelectorAll(".faq-item");


faqs.forEach(faq => {

    const question =
        faq.querySelector(
            ".faq-question"
        );


    if (!question) return;


    question.addEventListener(
        "click",
        () => {

            const isActive =
                faq.classList.contains(
                    "active"
                );


            faqs.forEach(item => {

                item.classList.remove(
                    "active"
                );


                const icon =
                    item.querySelector(
                        ".faq-icon"
                    );


                if (icon) {

                    icon.classList.remove(
                        "fa-minus"
                    );

                    icon.classList.add(
                        "fa-plus"
                    );

                }

            });


            if (!isActive) {

                faq.classList.add(
                    "active"
                );


                const icon =
                    faq.querySelector(
                        ".faq-icon"
                    );


                if (icon) {

                    icon.classList.remove(
                        "fa-plus"
                    );

                    icon.classList.add(
                        "fa-minus"
                    );

                }

            }

        }
    );

});


/* ===========================
   PROJECT FILTER
=========================== */

const filterButtons =
    document.querySelectorAll(
        ".projects-filter-btn"
    );


const projectCards =
    document.querySelectorAll(
        ".featured-project-card"
    );


filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach(btn => {

                btn.classList.remove(
                    "active"
                );

            });


            button.classList.add(
                "active"
            );


            const filter =
                button.getAttribute(
                    "data-filter"
                );


            projectCards.forEach(card => {

                if (
                    filter === "*" ||
                    card.classList.contains(
                        filter.replace(
                            ".",
                            ""
                        )
                    )
                ) {

                    card.style.display =
                        "block";

                } else {

                    card.style.display =
                        "none";

                }

            });

        }
    );

});


/* ===========================
   PROJECT GALLERY SWIPER
=========================== */

if (
    document.querySelector(
        ".gallerySwiper"
    ) &&
    typeof Swiper !== "undefined"
) {

    const gallerySwiper =
        new Swiper(
            ".gallerySwiper",
            {

                loop: false,

                spaceBetween: 30,

                autoplay: {

                    delay: 3000,

                    disableOnInteraction:
                        false,

                },

                pagination: {

                    el:
                        ".swiper-pagination",

                    clickable: true,

                },

                navigation: {

                    nextEl:
                        ".swiper-button-next",

                    prevEl:
                        ".swiper-button-prev",

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

            }
        );

}


/* ===========================
   PROJECT GALLERY POPUP
=========================== */

const modal =
    document.querySelector(
        ".gallery-modal"
    );


const modalImg =
    document.getElementById(
        "modalImage"
    );


const modalTitle =
    document.getElementById(
        "modalTitle"
    );


const modalLocation =
    document.getElementById(
        "modalLocation"
    );


const modalArea =
    document.getElementById(
        "modalArea"
    );


const modalStatus =
    document.getElementById(
        "modalStatus"
    );


const modalCategory =
    document.getElementById(
        "modalCategory"
    );


const modalDescription =
    document.getElementById(
        "modalDescription"
    );


const modalMaterials =
    document.getElementById(
        "modalMaterials"
    );


const galleryCards =
    document.querySelectorAll(
        ".gallery-card"
    );


galleryCards.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            if (!modal) return;


            modal.classList.add(
                "active"
            );


            const image =
                card.querySelector(
                    "img"
                );


            if (
                modalImg &&
                image
            ) {

                modalImg.src =
                    image.src;

            }


            if (modalTitle) {

                modalTitle.innerText =
                    card.dataset.title ||
                    "";

            }


            if (modalLocation) {

                modalLocation.innerText =
                    card.dataset.location ||
                    "";

            }


            if (modalArea) {

                modalArea.innerText =
                    card.dataset.area ||
                    "";

            }


            if (modalStatus) {

                modalStatus.innerText =
                    card.dataset.status ||
                    "";

            }


            if (modalCategory) {

                modalCategory.innerText =
                    card.dataset.category ||
                    "";

            }


            if (modalDescription) {

                modalDescription.innerText =
                    card.dataset.description ||
                    "";

            }


            if (modalMaterials) {

                modalMaterials.innerText =
                    card.dataset.materials ||
                    "";

            }

        }
    );

});


/* ===========================
   CLOSE GALLERY POPUP
=========================== */

const galleryClose =
    document.querySelector(
        ".gallery-close"
    );


if (
    galleryClose &&
    modal
) {

    galleryClose.onclick =
        () => {

            modal.classList.remove(
                "active"
            );

        };

}


window.addEventListener(
    "click",
    (e) => {

        if (
            modal &&
            e.target === modal
        ) {

            modal.classList.remove(
                "active"
            );

        }

    }
);


/* ===========================
   ESCAPE KEY
=========================== */

document.addEventListener(
    "keydown",
    (e) => {

        if (
            e.key === "Escape" &&
            modal
        ) {

            modal.classList.remove(
                "active"
            );

        }

    }
);


/* =========================================================
   AOS — PREMIUM SCROLL ANIMATION
========================================================= */

if (
    typeof AOS !== "undefined"
) {

    AOS.init({

        duration: 850,

        easing:
            "ease-out-cubic",

        offset: 90,

        once: true,

        mirror: false,

        disable:
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches

    });

}