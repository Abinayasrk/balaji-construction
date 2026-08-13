
/* =========================================================
   BALAJI CONSTRUCTION — PROJECT PAGE ONLY JS
   Dropdown filter + animations
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const page = document.querySelector(".project-page");
    if (!page) return;

    /* Scroll reveal */
    const revealItems = page.querySelectorAll(
        ".featured-project-card, " +
        ".projects-video-header, " +
        ".projects-video-card, " +
        ".project-gallery-section .section-title, " +
        ".gallery-card, " +
        ".process-card"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(function (entries, observer) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("project-visible");
                    observer.unobserve(entry.target);

                });

            }, {
                threshold: 0.12,
                rootMargin: "0px 0px -45px 0px"
            });

        revealItems.forEach(function (item, index) {
            item.classList.add("project-reveal");
            item.style.transitionDelay =
                Math.min(index * 55, 250) + "ms";
            revealObserver.observe(item);
        });

    } else {
        revealItems.forEach(function (item) {
            item.classList.add("project-visible");
        });
    }

    /* Dropdown project filter */
    const select =
        page.querySelector("#projectCategory");

    const cards =
        page.querySelectorAll(".featured-project-card");

    if (!select || !cards.length) return;

    function filterProjects(value) {

        cards.forEach(function (card, index) {

            const show =
                value === "*" ||
                card.classList.contains(
                    value.replace(".", "")
                );

            card.classList.remove(
                "project-filter-show",
                "project-filter-hide"
            );

            if (show) {

                card.style.display = "";

                /* Re-trigger animation */
                void card.offsetWidth;

                card.style.animationDelay =
                    Math.min(index * 70, 280) + "ms";

                card.classList.add(
                    "project-filter-show"
                );

            } else {

                card.classList.add(
                    "project-filter-hide"
                );

                setTimeout(function () {

                    if (
                        card.classList.contains(
                            "project-filter-hide"
                        )
                    ) {
                        card.style.display = "none";
                    }

                }, 430);

            }

        });
    }

    select.addEventListener("change", function () {
        filterProjects(this.value);
    });

});
