const wrapper = document.querySelector(".wrapper");
const carusel = document.querySelector(".carrousel")
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carusel.querySelector(".card").offsetWidth;
const caruselChildrens =[...carusel.children];

let isDragging = false, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(carusel.offsetWidth / firstCardWidth );

caruselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carusel.insertAdjacentHTML("afterbegin", card.outerHTML);
})



caruselChildrens.slice(0, cardPerView).forEach(card => {
    carusel.insertAdjacentHTML("beforeend", card.outerHTML);
})




arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carusel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth
    })
})

const dragStart = (e) =>{
    isDragging = true;
    carusel.classList.add("dragging");

    startX = e.pageX;
    startScrollLeft = carusel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return;

    carusel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () =>{
    isDragging = false;
    carusel.classList.remove("dragging");
}

const autoPlay = () => {
    if(window.innerWidth < 800) return;
    timeoutId = setTimeout(() => carusel.scrollLeft += firstCardWidth, 2500)
}

const infiniteScroll = () =>{
    if(carusel.scrollLeft === 0){
        carusel.classList.add("no-transition");
       carusel.scrollLeft = carusel.scrollLeft - ( 2 * carusel.offsetWidth);
       carusel.classList.remove("no-transition");
    }else if(Math.ceil(carusel.scrollLeft) === carusel.scrollWidth - carusel.offsetWidth){
        carusel.classList.add("no-transition");
        carusel.scrollLeft = carusel.offsetWidth;
        carusel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if(wrapper.matches(":hover")) autoPlay();
}
carusel.addEventListener("mousemove", dragging);
carusel.addEventListener("mousedown", dragStart);
document.addEventListener("mouseup",dragStop);
carusel.addEventListener("scroll", infiniteScroll)

