

const wrapperE = document.querySelector(".wrapperE");
const carouselE = document.querySelector(".carouselE");
const firstCardWidthE = carouselE.querySelector(".cardE").offsetWidth;
const arrowBtnsE = document.querySelectorAll(".wrapperE i");
const carouselChildrensE = [...carouselE.children];

let isDraggingE = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carouselE.offsetWidth / firstCardWidthE);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrensE.slice(-cardPerView).reverse().forEach(card => {
    carouselE.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrensE.slice(0, cardPerView).forEach(card => {
    carouselE.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carouselE.classList.add("no-transition");
carouselE.scrollLeft = carouselE.offsetWidth;
carouselE.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtnsE.forEach(btn => {
    btn.addEventListener("click", () => {
        carouselE.scrollLeft += btn.id == "left" ? -firstCardWidthE : firstCardWidthE;
    });
});

const dragStartE = (e) => {
    isDragging = true;
    carouselE.classList.add("draggingE");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carouselE.scrollLeft;
}

const draggingE = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carouselE.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStopE = () => {
    isDragging = false;
    carouselE.classList.remove("draggingE");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carouselE.scrollLeft === 0) {
        carouselE.classList.add("no-transition");
        carouselE.scrollLeft = carouselE.scrollWidth - (2 * carouselE.offsetWidth);
        carouselE.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carouselE.scrollLeft) === carouselE.scrollWidth - carouselE.offsetWidth) {
        carouselE.classList.add("no-transition");
        carouselE.scrollLeft = carouselE.offsetWidth;
        carouselE.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapperE.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carouselE.scrollLeft += firstCardWidthE, 2500);
}
autoPlay();

carouselE.addEventListener("mousedown", dragStartE);
carouselE.addEventListener("mousemove", draggingE);
document.addEventListener("mouseup", dragStopE);
carouselE.addEventListener("scroll", infiniteScroll);
wrapperE.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapperE.addEventListener("mouseleave", autoPlay);