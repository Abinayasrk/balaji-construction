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

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const counter = entry.target;
            const target = +counter.dataset.target;

            let count = 0;

            const update = () => {
                const increment = Math.ceil(target / 100);

                if(count < target){
                    count += increment;
                    counter.innerText = count;
                    setTimeout(update,20);
                }else{
                    counter.innerText = target + "+";
                }
            };

            update();
            observer.unobserve(counter);
        }
    });
},{threshold:0.5});

counters.forEach(counter => observer.observe(counter));