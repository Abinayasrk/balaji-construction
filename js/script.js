const fadeElements = document.querySelectorAll('.fade-section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show'); // வெளியே போகும்போது remove
        }
    });
}, {
    threshold: 0.3
});

fadeElements.forEach(el => observer.observe(el));
