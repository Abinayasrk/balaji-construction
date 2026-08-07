//==============================
// AOS
//==============================

AOS.init({
    duration:1000,
    once:true
});

//==============================
// Mobile Menu
//==============================

const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");

menuBtn.addEventListener("click",()=>{

    navbar.classList.toggle("active");

});

//==============================
// Sticky Header
//==============================

const header = document.querySelector(".header");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 80){

        header.classList.add("sticky");

    }

    else{

        header.classList.remove("sticky");

    }

});

//==============================
// Counter Animation
//==============================

const counters=document.querySelectorAll(".counter-box h2");

let started=false;

window.addEventListener("scroll",()=>{

const section=document.querySelector(".counter");

if(!section) return;

const top=section.offsetTop-400;

if(window.scrollY>=top && !started){

started=true;

counters.forEach(counter=>{

const target=parseInt(counter.innerText);

let count=0;

const speed=target/100;

const update=()=>{

count+=speed;

if(count<target){

counter.innerText=Math.ceil(count)+"+";

requestAnimationFrame(update);

}

else{

counter.innerText=target+"+";

}

};

update();

});

}

});

//==============================
// Back To Top
//==============================

const topBtn=document.createElement("button");

topBtn.innerHTML="<i class='fa-solid fa-arrow-up'></i>";

topBtn.className="top-btn";

document.body.appendChild(topBtn);

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

topBtn.classList.add("show");

}

else{

topBtn.classList.remove("show");

}

});

topBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});
