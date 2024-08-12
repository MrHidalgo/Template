// Upscaling low-res background images after page load
const containersToUpscale = document.querySelectorAll('[data-hires]');
if (window.innerWidth >= 960 && containersToUpscale.length > 0) {
    containersToUpscale.forEach((container) => {
        // Create a new image and set its path to hires path
        const newPath = container.dataset.hires;
        const hiresImage = new Image();
        hiresImage.src = newPath;

        // When image loads, replace bg image with new one
        // TODO: store loaded state in localStorage and check status earlier (in head perhaps)
        // And set hires from localStorage so user doesn't have to wait
        hiresImage.addEventListener('load', () => {
            container.style.backgroundImage = `url(${newPath})`;
            hiresImage.removeEventListener('load', () => {});
        });
    });
}