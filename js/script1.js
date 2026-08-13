const reveals = document.querySelectorAll(
  '.reveal-left, .reveal-right, .reveal-up'
);

const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      /*  if(entry.isIntersecting){
            entry.target.classList.add('show');
        }else{
            entry.target.classList.remove('show');
        }*/
       if (entry.isIntersecting) {
      entry.target.classList.add('show');

      // Stop observing after the first reveal
      observer.unobserve(entry.target);
    }
    });
},{
    threshold:0.3
});

reveals.forEach(el=>observer.observe(el));
function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("active");
}



reveals.forEach((el)=>{
    observer.observe(el);
});

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
}, { threshold: 0.5 });

counters.forEach(counter => statsObserver.observe(counter));

// project carosal
// Project Carousel
if (document.querySelector(".projectSwiper") && typeof Swiper !== "undefined") {

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
            },
        },
    });

}
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(button=>{

button.addEventListener("click",()=>{

tabButtons.forEach(btn=>btn.classList.remove("active"));
tabContents.forEach(content=>content.classList.remove("active"));

button.classList.add("active");

document
.getElementById(button.dataset.tab)
.classList.add("active");

});

});
// FAQ Accordion

const faqs = document.querySelectorAll(".faq-item");

faqs.forEach(faq => {

    faq.querySelector(".faq-question").addEventListener("click", () => {

        const isActive = faq.classList.contains("active");

        faqs.forEach(item => {

            item.classList.remove("active");

            item.querySelector(".faq-icon")
                .classList.replace("fa-minus","fa-plus");

        });

        if(!isActive){

            faq.classList.add("active");

            faq.querySelector(".faq-icon")
                .classList.replace("fa-plus","fa-minus");

        }

    });

});
// ===========================
// PROJECT FILTER (Isotope)
// ===========================
/*
window.addEventListener("load", () => {

    const grid = document.querySelector(".featured-projects-grid");

    const iso = new Isotope(grid,{
        itemSelector:".featured-project-card",
        layoutMode:"fitRows",
        transitionDuration:"0.5s"
    });

    const buttons = document.querySelectorAll(".projects-filter-btn");

    buttons.forEach(button=>{

        button.addEventListener("click",()=>{

            buttons.forEach(btn=>btn.classList.remove("active"));

            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            iso.arrange({
                filter:filterValue
            });

        });

    });

});*/
const filterButtons = document.querySelectorAll(".projects-filter-btn");
const projectCards = document.querySelectorAll(".featured-project-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.getAttribute("data-filter");

        projectCards.forEach(card => {

            if (filter === "*" || card.classList.contains(filter.replace(".", ""))) {
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

const gallerySwiper = new Swiper(".gallerySwiper", {

    loop:false,

    spaceBetween:30,

    autoplay:{
        delay:3000,
        disableOnInteraction:false,
    },

    pagination:{
        el:".swiper-pagination",
        clickable:true,
    },

    navigation:{
        nextEl:".swiper-button-next",
        prevEl:".swiper-button-prev",
    },

    breakpoints:{

        0:{
            slidesPerView:1,
        },

        768:{
            slidesPerView:2,
        },

        1024:{
            slidesPerView:3,
        }

    }

});


/* ===========================
   PROJECT POPUP
=========================== */

const modal = document.querySelector(".gallery-modal");
console.log(modal);
const modalImg = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalLocation = document.getElementById("modalLocation");
const modalArea = document.getElementById("modalArea");
const modalStatus = document.getElementById("modalStatus");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");
const modalMaterials = document.getElementById("modalMaterials");

const gallerycards = document.querySelectorAll(".gallery-card");

gallerycards.forEach(card=>{

    card.addEventListener("click",()=>{

        modal.classList.add("active");

        modalImg.src = card.querySelector("img").src;

        modalTitle.innerText = card.dataset.title;

        modalLocation.innerText = card.dataset.location;

        modalArea.innerText = card.dataset.area;

        modalStatus.innerText = card.dataset.status;

        modalCategory.innerText = card.dataset.category;

        modalDescription.innerText = card.dataset.description;

        modalMaterials.innerText = card.dataset.materials;

    });

});


/* ===========================
   CLOSE POPUP
=========================== */

const galleryClose = document.querySelector(".gallery-close");

if (galleryClose && modal) {
    galleryClose.onclick = () => {
        modal.classList.remove("active");
    };
}

window.onclick = function(e){

    if(e.target == modal){

        modal.classList.remove("active");

    }

};


document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        modal.classList.remove("active");

    }

});


/* =========================================================
   BALAJI CONSTRUCTION — PROJECT PAGE ENHANCEMENTS
   Unified into the site's script.js
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* ---------------------------
       AOS
    --------------------------- */
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 850,
            easing: "ease-out-cubic",
            offset: 90,
            once: true,
            mirror: false,
            disable:
                window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches
        });
    }


    /* ---------------------------
       PREMIUM SCROLL REVEAL
    --------------------------- */
    const revealItems = document.querySelectorAll(
        ".projects-intro-container, " +
        ".featured-project-card, " +
        ".projects-video-header, " +
        ".projects-video-card, " +
        ".project-gallery-section .section-title, " +
        ".gallery-card, " +
        ".process-card"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "project-reveal"
                        );

                        requestAnimationFrame(function () {

                            entry.target.classList.add(
                                "is-visible"
                            );

                        });

                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -45px 0px"
                }
            );

        revealItems.forEach(function (item, index) {

            item.style.transitionDelay =
                Math.min(index * 45, 260) + "ms";

            revealObserver.observe(item);

        });

    } else {

        revealItems.forEach(function (item) {

            item.classList.add(
                "project-reveal",
                "is-visible"
            );

        });

    }


    /* ---------------------------
       PREMIUM FILTER ANIMATION
       Existing filter remains the
       source of truth; this adds
       animation without replacing it.
    --------------------------- */
    const projectFilterButtons =
        document.querySelectorAll(
            ".projects-filter-btn"
        );

    const projectCards =
        document.querySelectorAll(
            ".featured-project-card"
        );

    projectFilterButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                projectFilterButtons.forEach(
                    function (btn) {
                        btn.setAttribute(
                            "aria-pressed",
                            btn === button
                                ? "true"
                                : "false"
                        );
                    }
                );

                const filter =
                    button.getAttribute(
                        "data-filter"
                    );

                projectCards.forEach(
                    function (card, index) {

                        const show =
                            filter === "*" ||
                            card.classList.contains(
                                filter.replace(
                                    ".",
                                    ""
                                )
                            );

                        if (show) {

                            card.classList.remove(
                                "project-hidden"
                            );

                            card.classList.remove(
                                "project-filter-in"
                            );

                            void card.offsetWidth;

                            card.style.animationDelay =
                                Math.min(
                                    index * 70,
                                    350
                                ) + "ms";

                            card.classList.add(
                                "project-filter-in"
                            );

                        } else {

                            card.classList.add(
                                "project-hidden"
                            );

                        }

                    }
                );

            }
        );

    });


    /* ---------------------------
       VIDEO CONTROL
       Only one project video plays
       at a time.
    --------------------------- */
    const projectVideos =
        document.querySelectorAll(
            ".projects-video-card video"
        );

    projectVideos.forEach(function (video) {

        video.addEventListener(
            "play",
            function () {

                projectVideos.forEach(
                    function (otherVideo) {

                        if (
                            otherVideo !== video
                        ) {
                            otherVideo.pause();
                        }

                    }
                );

            }
        );

    });


    /* ---------------------------
       MODAL BODY LOCK
       Existing gallery modal logic
       remains in the shared script.
    --------------------------- */
    const projectModal =
        document.querySelector(
            ".gallery-modal"
        );

    if (projectModal) {

        const modalObserver =
            new MutationObserver(
                function () {

                    document.body.classList.toggle(
                        "modal-open",
                        projectModal.classList.contains(
                            "active"
                        )
                    );

                }
            );

        modalObserver.observe(
            projectModal,
            {
                attributes: true,
                attributeFilter: ["class"]
            }
        );

    }


    /* ---------------------------
       HEADER + FOOTER
    --------------------------- */
    const header =
        document.getElementById("header");

    if (header) {

        fetch("header1.html")
            .then(function (response) {
                if (!response.ok) {
                    throw new Error(
                        "Header request failed"
                    );
                }
                return response.text();
            })
            .then(function (data) {
                header.innerHTML = data;
            })
            .catch(function (error) {
                console.error(
                    "Header load error:",
                    error
                );
            });

    }


    const footer =
        document.getElementById("footer");

    if (footer) {

        fetch("footer1.html")
            .then(function (response) {
                if (!response.ok) {
                    throw new Error(
                        "Footer request failed"
                    );
                }
                return response.text();
            })
            .then(function (data) {
                footer.innerHTML = data;
            })
            .catch(function (error) {
                console.error(
                    "Footer load error:",
                    error
                );
            });

    }

});
