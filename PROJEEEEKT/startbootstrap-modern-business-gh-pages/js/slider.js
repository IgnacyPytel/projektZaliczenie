// darmowy szablon slider'a typu drag+slide
// link: https://codepen.io/Rana-Ali-the-lessful/pen/ZENLRda

const cadmg = document.querySelector(".cad-img");
fastamg = cadmg.querySelectorAll("img")[0];
cadmgicon = document.querySelectorAll(".slder-cad i");


let sdagstat = false, isDragging = false, prevpageX, prevScrollLeft, hhhggg ;

const showHidicon = () => {
    let screllWidth = cadmg.scrollWidth - cadmg.clientWidth;
    cadmgicon[0].style.display = cadmg.scrollLeft == 0 ? "none" : "block";
    cadmgicon[1].style.display = cadmg.scrollLeft == screllWidth ? "none" : "block";
}

cadmgicon.forEach(icon => {
    icon.addEventListener("click", () => {
        let fastamGwidth = fastamg.clientWidth + 14;
        cadmg.scrollLeft += icon.id == "left" ? -fastamGwidth : fastamGwidth;
        setTimeout(() => showHidicon(), 60);
    })
});

const autoSlide = () => {
    if(cadmg.scrollLeft == (cadmg.scrollWidth - cadmg.clientWidth)) return;

    hhhggg = Math.abs(hhhggg);
    let firstImgWidth = fastamg.clientWidth + 14;
    let vaIdiffernce = firstImgWidth - hhhggg;

    if(cadmg.scrollLeft > prevScrollLeft){
       return cadmg.scrollLeft += hhhggg > firstImgWidth / 3 ? vaIdiffernce : -hhhggg;
    }
    cadmg.scrollLeft -= hhhggg > firstImgWidth / 3 ? vaIdiffernce : -hhhggg;
}

const dragstat = (e) => {
    sdagstat = true;
    prevpageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = cadmg.scrollLeft

}
const dragging =(e) => {
    if(!sdagstat) return;
    e.preventDefault()
    isDragging = true;
    cadmg.classList.add("dragging");
    hhhggg =  (e.pageX || e.touches[0].pageX) -  prevpageX ;
    cadmg.scrollLeft = prevScrollLeft - hhhggg;
    showHidicon();
}

const dragstp = () => {
    sdagstat = false;
    cadmg.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

cadmg.addEventListener("mousedown", dragstat);
cadmg.addEventListener("touchstart", dragstat);

cadmg.addEventListener("mousemove",dragging );
cadmg.addEventListener("touchmove",dragging );

cadmg.addEventListener("mouseup",dragstp);
cadmg.addEventListener("mouseleave",dragstp);
cadmg.addEventListener("touchend",dragstp);

//drugi slider mojego autorstwa dla informacji i zdjec

const sliderImages = [
    {
        src: 'images/mazury/MikolajkiMazury.jpg',
        title: 'Piękno Mazur',
        description: 'Mazury, kraina tysiąca jezior, oferuje nie tylko piękne widoki, ale również wiele atrakcji dla miłośników przyrody i historii. To idealne miejsce na odpoczynek i aktywny wypoczynek.'
    },
    {
        src: 'images/mazury/mazurskiPark.png',
        title: 'Mazurski Park Krajobrazowy',
        description: 'Mazurski Park Krajobrazowy to jedno z najpiękniejszych miejsc w Polsce, pełne dzikiej przyrody i zapierających dech w piersiach widoków.'
    },
    {
        src: 'images/mazury/wilczySzaniec.jpg',
        title: 'Wilczy Szaniec',
        description: 'Wilczy Szaniec to historyczne miejsce, które warto odwiedzić, aby poznać mroczną historię II wojny światowej.'
    },
    {
        src: 'images/mazury/zamekKrzyzacki.jpg',
        title: 'Zamek Krzyżacki',
        description: 'Zamek Krzyżacki to jedno z najważniejszych zabytków na Mazurach, które zachwyca swoją architekturą i historią.'
    }
];

let currentSlide = 0;

const updateSlider = () => {
    document.querySelector('.slider-image img').src = sliderImages[currentSlide].src;
    document.querySelector('.slider-content h2').innerText = sliderImages[currentSlide].title;
    document.querySelector('.slider-content p').innerText = sliderImages[currentSlide].description;
};

document.getElementById('slider-prev').addEventListener('click', () => {
    currentSlide = (currentSlide > 0) ? currentSlide - 1 : sliderImages.length - 1;
    updateSlider();
});

document.getElementById('slider-next').addEventListener('click', () => {
    currentSlide = (currentSlide < sliderImages.length - 1) ? currentSlide + 1 : 0;
    updateSlider();
});

updateSlider();