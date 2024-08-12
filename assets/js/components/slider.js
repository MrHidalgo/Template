/*
https://splidejs.com/guides/getting-started/
*/

import '@splidejs/splide/css/core';
import Splide from '@splidejs/splide';

const slider = document.querySelector('.slider');

if( slider ) {
    var splide = new Splide( '.slider' , {
        // type: 'fade',
        speed: 1000,
        arrows: false,
        autoplay: true,
        pagination: true,
        rewind: true,
        waitForTransition: false,
    });

    splide.on( 'pagination:mounted', function ( data ) {
        data.items.forEach( function ( item ) {
            let slideID = item.button.getAttribute('aria-controls');
            let slide = slider.querySelector('#'+slideID);
            let reviewAuthor = slide.querySelector('blockquote').getAttribute('data-review-author');
            item.button.textContent = String( reviewAuthor );
        } );
    });

    splide.mount();
}