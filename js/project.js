
/* =========================================================
   BALAJI CONSTRUCTION — PROJECT PAGE ONLY JS
   Final dropdown + animations
========================================================= */

document.addEventListener("DOMContentLoaded", function(){

    const page=document.querySelector(".project-page");
    if(!page) return;

    /* -------------------------
       Scroll reveal
    ------------------------- */
    const revealItems=page.querySelectorAll(
        ".featured-project-card, " +
        ".projects-video-header, " +
        ".projects-video-card, " +
        ".project-gallery-section .section-title, " +
        ".gallery-card, " +
        ".process-card"
    );

    if("IntersectionObserver" in window){

        const observer=new IntersectionObserver(
            function(entries,obs){

                entries.forEach(function(entry){

                    if(!entry.isIntersecting) return;

                    entry.target.classList.add("project-visible");
                    obs.unobserve(entry.target);

                });

            },
            {
                threshold:.12,
                rootMargin:"0px 0px -40px 0px"
            }
        );

        revealItems.forEach(function(item,index){

            item.classList.add("project-reveal");

            item.style.transitionDelay=
                Math.min(index*55,250)+"ms";

            observer.observe(item);

        });

    }else{

        revealItems.forEach(function(item){
            item.classList.add("project-visible");
        });

    }

    /* -------------------------
       Dropdown filter
    ------------------------- */
    const select=
        page.querySelector("#projectCategory");

    const cards=
        page.querySelectorAll(".featured-project-card");

    if(!select || !cards.length) return;

    let filterTimer=[];

    function filterProjects(value){

        filterTimer.forEach(clearTimeout);
        filterTimer=[];

        cards.forEach(function(card,index){

            const category=value.replace(".","");

            const show=
                value==="*" ||
                card.classList.contains(category);

            card.classList.remove(
                "project-filter-show",
                "project-filter-hide"
            );

            if(show){

                card.style.display="";

                /* force animation restart */
                void card.offsetWidth;

                card.style.animationDelay=
                    Math.min(index*75,300)+"ms";

                card.classList.add("project-filter-show");

            }else{

                card.classList.add("project-filter-hide");

                const timer=setTimeout(function(){

                    if(
                        card.classList.contains(
                            "project-filter-hide"
                        )
                    ){
                        card.style.display="none";
                    }

                },430);

                filterTimer.push(timer);

            }

        });

        /* Smoothly bring the filtered grid into view */
        const grid=
            page.querySelector(".featured-projects-grid");

        if(grid){

            setTimeout(function(){

                grid.scrollIntoView({
                    behavior:"smooth",
                    block:"start"
                });

            },80);

        }

    }

    select.addEventListener("change",function(){
        filterProjects(this.value);
    });

});


/* =========================================================
   UNIQUE PROJECT GALLERY — PROJECT PAGE ONLY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const page = document.querySelector(".project-page");
    if (!page) return;

    const galleryCards =
        page.querySelectorAll(".project-gallery-card");

    const modal =
        page.querySelector(".project-gallery-modal");

    const modalImage =
        page.querySelector("#modalImage");

    const modalTitle =
        page.querySelector("#modalTitle");

    const modalCategory =
        page.querySelector("#modalCategory");

    const modalDescription =
        page.querySelector("#modalDescription");

    const closeButton =
        page.querySelector(".project-gallery-modal-close");

    if (!galleryCards.length || !modal) return;

    function openGallery(card) {

        const image = card.querySelector("img");

        if (image && modalImage) {
            modalImage.src = image.src;
            modalImage.alt = image.alt || "Project gallery image";
        }

        if (modalTitle) {
            modalTitle.textContent =
                card.dataset.title || "Project Gallery";
        }

        if (modalCategory) {
            modalCategory.textContent =
                card.dataset.category || "Portfolio";
        }

        if (modalDescription) {
            modalDescription.textContent =
                card.dataset.description || "";
        }

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("gallery-modal-open");

    }

    function closeGallery() {

        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("gallery-modal-open");

    }

    galleryCards.forEach(function (card) {

        card.addEventListener("click", function () {
            openGallery(card);
        });

        const viewButton =
            card.querySelector(".project-gallery-view");

        if (viewButton) {
            viewButton.addEventListener("click", function (event) {
                event.stopPropagation();
                openGallery(card);
            });
        }

    });

    if (closeButton) {
        closeButton.addEventListener("click", closeGallery);
    }

    modal.addEventListener("click", function (event) {

        if (
            event.target === modal ||
            event.target.classList.contains(
                "project-gallery-modal-backdrop"
            )
        ) {
            closeGallery();
        }

    });

    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            modal.classList.contains("active")
        ) {
            closeGallery();
        }

    });

});
