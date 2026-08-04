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

document.querySelector(".gallery-close").onclick = ()=>{

    modal.classList.remove("active");

};


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