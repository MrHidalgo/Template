// Animate on scroll
const animations = document.querySelectorAll('[data-aos]');

// const observedClassAdd = 'js-intersection-observed';
// const observedClassRemove = 'js-zoom';

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        const index = Array.from(animations).indexOf(entry.target);
        if (entry.isIntersecting) {
            animations[index].classList.add('js-intersection-observed', 'js-zoom');
        } else {
            animations[index].classList.remove('js-zoom');
        }
    })
}, {
    threshold: 0
});

// Start the observer
animations.forEach(animation => {
    observer.observe(animation);
});