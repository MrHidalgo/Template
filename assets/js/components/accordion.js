// Util functions
function makeInert(element) {
    // renders content non-interactive (meant to prevent tabbing around
    // hidden elements)
    // TODO: keep an eye on w3c validity of this attribute.
    if (element) {
        element.setAttribute('inert', '');
    }
}

function makeInteractive(element) {
    if (element) {
        element.removeAttribute('inert');
    }
}

// Initialize Accordions
const accordions = document.querySelectorAll('.accordion');

// Loop through all accordions on the page
if (accordions.length > 0) {
    accordions.forEach((accordion, accordionIndex) => {
        const accordionItems = accordion.querySelectorAll('.accordion__item');

        // Loop through all items inside each accordion
        if (accordionItems.length > 0) {
            accordionItems.forEach((accordionItem, accordionItemIndex) => {
                const accordionButton = accordionItem.querySelector('.accordion__header > button');
                const accordionPanel = accordionItem.querySelector('.accordion__panel');

                if (accordionButton && accordionPanel) {
                    // Initializing item expanded state
                    let accordionItemIsExpanded = false;

                    // Setting ids that will correlate content panels and corresponding triggers
                    accordionButton.id = `accordion__trigger-${accordionIndex}-${accordionItemIndex}`;
                    accordionPanel.id = `accordion__panel-${accordionIndex}-${accordionItemIndex}`;
                    // Setting accessibility attributes
                    accordionButton.setAttribute('aria-controls', accordionPanel.id);
                    accordionPanel.setAttribute('aria-labelledby', accordionButton.id);
                    makeInert(accordionPanel);

                    // Accordion item toggle interaction
                    accordionButton.addEventListener('click', () => {
                        const accordionContent = accordionItem.querySelector('.accordion__content');
                        const accordionContentHeight = accordionContent.offsetHeight;
                        // Set panel height to equal content height
                        accordionPanel.style.height = `${accordionContentHeight}px`;

                        if (!accordionItemIsExpanded) {
                            // Expand item
                            accordionItemIsExpanded = true;
                            accordionButton.setAttribute('aria-expanded', 'true'); // html attribute value hence string type
                            makeInteractive(accordionPanel);
                            accordionPanel.removeAttribute('aria-hidden');
                            // Change item state to 'expanding' (starting transition)
                            accordionItem.classList.add('accordion__item--expanding');
                            // When height transition is over
                            accordionPanel.ontransitionend = (event) => {
                                if (accordionItemIsExpanded && event.propertyName == 'height') {
                                    // Change item state from 'expanding' to 'expanded
                                    accordionItem.classList.remove('accordion__item--expanding');
                                    accordionPanel.removeAttribute('style');
                                    accordionItem.classList.add('accordion__item--expanded');
                                }
                            };
                        } else {
                            // Collapse item
                            accordionItemIsExpanded = false;
                            accordionButton.setAttribute('aria-expanded', 'false'); // html attribute value hence string type
                            accordionPanel.setAttribute('inert', '');
                            accordionPanel.setAttribute('aria-hidden', 'true'); // html attribute value hence string type
                            // Timer is needed to re-trigger animation after panel height is set to content height and then back to 0
                            setTimeout(() => {
                                accordionPanel.removeAttribute('style');
                                accordionItem.classList.remove('accordion__item--expanded');
                            }, 50);
                        }
                    });
                }
            });
        }
    });
}