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

//navbar mobile script
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll("#nav-links a");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Menu item click ஆனவுடன் menu close ஆகும்
navItems.forEach(item => {
    item.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});
