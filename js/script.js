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