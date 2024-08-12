document.addEventListener("DOMContentLoaded", () => {
    const mobileBreakpoint = 768;
    const body = document.querySelector('body');
    const nav = document.querySelector('.main-navigation');
    // remove 'hide' class from nav
    nav.classList.remove('hide');
    const menuToggle = document.querySelector('.menu-toggle');
    const topLevelItems = nav.querySelectorAll('.main-navigation__nav > li'); // nav items with subnav
    const ddItems = nav.querySelectorAll('.main-navigation__nav > li.has-submenu'); // nav items with subnav
    const subItems = nav.querySelectorAll('.submenu--first-level > ul > li.has-submenu');

    // open/close main nav
    function toggleNav() {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
        body.classList.toggle('scroll-lock');

        // reset css classes after closing the nav
        if( !nav.classList.contains('active') ) {
            resetAllClasses();
        }
    }

    // open/close main nav button
    menuToggle.addEventListener('click', () => {
        toggleNav();
    });

    // add toggle btn on mobile only
    function appendMobileToggleBtn() {
        if(ddItems) {
            ddItems.forEach( (item) => {
                let firstLevel = item.querySelector('.submenu--first-level');
                // lets add a span to the top-level items to act as a toggle button
                let navItem = item.querySelector('a:first-of-type');
                navItem.innerHTML = navItem.textContent + '<span class="btn-mobile-toggle"></span>';
                // toggle (open/close) first level dropdown function
                let btnToggleDropdown = navItem.querySelector('.btn-mobile-toggle');
                btnToggleDropdown.addEventListener('click', (e)=> {
                    e.preventDefault();
                    navItem.classList.toggle('active');
                    firstLevel.classList.toggle('show');
                });
            });
        }
    }

    // function to clone submenu for mobile
    function cloneSubMenu() {
        // kill the function so it only runs once
        cloneSubMenu = function(){};
        
        if(subItems) {
            subItems.forEach( (item) => {
                let itemID = item.getAttribute('data-submenu');
                // get second level menu
                let parentItem = item.closest('.submenu-container');
                let secondLevel = parentItem.querySelector('.submenu--second-level[data-submenu-id="'+itemID+'"]');
                // clone second level menu
                let clone = secondLevel.cloneNode(true);
                // add mobile class to distinguish from original
                clone.classList.add('mobile');
                // paste clone into the the list item for mobile markup
                item.append(clone);
            });
        }
    }

    // close nav using Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key == 'Escape' && menuToggle.classList.contains('active')) {
            toggleNav();
        }
    });

    function resetAllClasses() {
        let elementClasses = nav.querySelectorAll('.show, .hide, .active');

        // .show
        if( elementClasses ) {
            elementClasses.forEach( (cssClass) => {
                cssClass.classList.remove('hide');
                cssClass.classList.remove('show');
                cssClass.classList.remove('active');
            });
        }
    }

    // handle responsive media queries to check if we are on desktop or mobile based on the mobileBreakpoint variable
    function navHandleMQ(matches) {
        if (matches) {
            // media query matches (MOBILE)
            nav.classList.remove('is-desktop');
            nav.classList.add('is-mobile');
            appendMobileToggleBtn();
            cloneSubMenu();
            resetAllClasses();
        } else {
            // media query does not match (DESKTOP)
            nav.classList.remove('is-mobile');
            nav.classList.add('is-desktop');
            resetAllClasses();
        }

    }
    const query = window.matchMedia(`(max-width: ${mobileBreakpoint}px)`);
    query.addEventListener("change", ({ matches }) => navHandleMQ(matches));
    navHandleMQ(query.matches);

    // dropdown & subnavs
    if(ddItems) {
        ddItems.forEach( (item) => {
            let firstLevel = item.querySelector('.submenu-container > div.submenu--first-level');
            let btnNext = item.querySelectorAll('.submenu--first-level ul li.has-submenu button');
            let btnBack = item.querySelectorAll('.submenu--second-level button.submenu__btn--back');
            
            // next buttons
            if( btnNext ) {
                btnNext.forEach( (btn) => {
                    btn.addEventListener('click', ()=> {
                        let clickedItem = btn.parentNode;
                        let targetMenuID = clickedItem.getAttribute('data-submenu');

                        // hide first level submenu on desktop only
                        if( nav.classList.contains('is-desktop') ) {
                            let firstLevel = item.querySelector('.submenu--first-level');
                            firstLevel.classList.add('hide');
                            
                            // open second level submenu
                            let secondLevel = item.querySelector('.submenu-container > div.submenu--second-level[data-submenu-id="'+targetMenuID+'"]');
                            secondLevel.classList.add('show');
                        }

                        // add active class for mobile arrow rotation animation
                        if( nav.classList.contains('is-mobile') ) {
                            btn.classList.toggle('active');
                            
                            // open second level submenu
                            let secondLevel = btn.nextElementSibling;
                            secondLevel.classList.toggle('show');
                        }
                    });
                });
            }

            // back buttons
            if( btnBack ) {
                btnBack.forEach( (btn) => {
                    btn.addEventListener('click', ()=> {
                        // close second level
                        btn.closest('.submenu--second-level').classList.remove('show');
                        // re-open first level
                        firstLevel.classList.remove('hide');
                    });
                });
            }

        });
    }
});