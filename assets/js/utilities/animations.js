// Animate on scroll
const animations = document.querySelectorAll('[data-aos]');
const observedClass = 'js-intersection-observed';
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        const index = Array.from(animations).indexOf(entry.target);
        if (entry.isIntersecting) {
            animations[index].classList.add(observedClass);
        }
    })
}, {
    threshold: 0
});

// Start the observer
animations.forEach(animation => {
    observer.observe(animation);
});