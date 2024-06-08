// darmowy szablon slider'a typu drag+slide
// link: https://codepen.io/Rana-Ali-the-lessful/pen/ZENLRda
// caly opis funkcji/slidera zawarty jest w "dokumentacji"

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

// zmienne dla slidera z galerią zdjęć dla roznych podstron
const sliderImagesMazury = [
    {
        src: 'images/mazury/MikolajkiMazury.jpg',
        class: "gallery-img" ,
        title: 'Piękno Mazur',
        description: 'Mazury, kraina tysiąca jezior, oferuje nie tylko piękne widoki, ale również wiele atrakcji dla miłośników przyrody i historii. To idealne miejsce na odpoczynek i aktywny wypoczynek.'
    },
    {
        src: 'images/mazury/mazurskiPark.png',
        class: "gallery-img" ,
        title: 'Mazurski Park Krajobrazowy',
        description: 'Mazurski Park Krajobrazowy to jedno z najpiękniejszych miejsc w Polsce, pełne dzikiej przyrody i zapierających dech w piersiach widoków.'
    },
    {
        src: 'images/mazury/wilczySzaniec.jpg',
        class: "gallery-img" ,
        title: 'Wilczy Szaniec',
        description: 'Wilczy Szaniec to historyczne miejsce, które warto odwiedzić, aby poznać mroczną historię II wojny światowej.'
    },
    {
        src: 'images/mazury/zamekKrzyzacki.jpg',
        class: "gallery-img" ,
        title: 'Zamek Krzyżacki',
        description: 'Zamek Krzyżacki to jedno z najważniejszych zabytków na Mazurach, które zachwyca swoją architekturą i historią, zamek ten zbudowany został w XIV wieku.'
    }
];

const sliderImagesBaltyk = [
    {
        src: 'images/morze/klifOrlowski.jpg',
        class: "gallery-img" ,
        title: 'Klif Orłowski',
        description: 'Klif Orłowski to malowniczy fragment polskiego wybrzeża Bałtyku, znany ze swoich imponujących klifów i pięknych widoków.'
    },
    {
        src: 'images/morze/morzeSopot.png',
        class: "gallery-img" ,
        title: 'Sopot',
        description: 'Sopot to popularna miejscowość nadbałtycka, słynąca ze swojego urokliwego molo oraz długiej, piaszczystej plaży.'
    },
    {
        src: 'images/morze/ruchomeWydmy.jpg',
        class: "gallery-img" ,
        title: 'Ruchome Wydmy',
        description: 'Ruchome Wydmy są unikalnym zjawiskiem przyrodniczym na polskim wybrzeżu Bałtyku. To obszar chroniony, gdzie piaski poruszają się pod wpływem wiatru.'
    },
    {
        src: 'images/morze/starePrzedmiasto.jpg',
        class: "gallery-img" ,
        title: 'Gdańsk',
        description: 'Gdańsk to jedno z najważniejszych miast nadbałtyckich, znane ze swojej bogatej historii i charakterystycznej architektury.'
    }
];


const sliderImagesGory = [
    {
        src: 'images/gory/dolinaPieciuStawow.jpg',
        class: "gallery-img" ,
        title: 'Dolina Pięciu Stawów',
        description: 'Dolina Pięciu Stawów to jedno z najpiękniejszych miejsc w Tatrach. Znajduje się tu pięć malowniczych stawów, które zachwycają swoim krystalicznym wyglądem.'
    },
    {
        src: 'images/gory/morskieOko.jpg',
        class: "gallery-img" ,
        title: 'Morskie Oko',
        description: 'Morskie Oko to jedno z najpopularniejszych jezior w Tatrach. Jest to idealne miejsce na spacer i podziwianie wspaniałych widoków na Tatry Wysokie.'
    },
    {
        src: 'images/gory/giewontZakopane.jpg',
        class: "gallery-img" ,
        title: 'Giewont',
        description: 'Giewont to jeden z najbardziej rozpoznawalnych szczytów w Tatrach. Jest często nazywany "Śpiącym Rycerzem" ze względu na swój charakterystyczny kształt.'
    },
    {
        src: 'images/gory/krupowki.jpg',
        class: "gallery-img" ,
        title: 'Krupówki',
        description: 'Krupówki to główna ulica Zakopanego, pełna sklepów, restauracji i kawiarni. Jest to miejsce, które tętni życiem przez cały rok.'
    }
];


// drugi slider, bardzo prosty, mojego autorstwa dla informacji i zdjec dla stron typu baltyk, mazury, gory

// zmienna przechowujaca indeks aktualnego slajdu
let currentSlide = 0;

// dynamiczna tablica obrazow
let sliderImages = [];

// funkcja aktualizujaca zawartosc slidera
const updateSlider = () => {
    // aktualizuje zrodlo obrazu w elemencie img
    document.querySelector('.slider-image img').src = sliderImages[currentSlide].src;
    
    // aktualizuje tytul w elemencie h2
    document.querySelector('.slider-content h2').innerText = sliderImages[currentSlide].title;
    
    // aktualizuje opis w elemencie p
    document.querySelector('.slider-content p').innerText = sliderImages[currentSlide].description;
};

// event listener dla przycisku poprzedniego slajdu
document.getElementById('slider-prev').addEventListener('click', () => {
    // aktualizuje indeks aktualnego slajdu
    currentSlide = (currentSlide > 0) ? currentSlide - 1 : sliderImages.length - 1;
    
    // wywoluje funkcje aktualizujaca slider
    updateSlider();
});

// event listener dla przycisku nastepnego slajdu
document.getElementById('slider-next').addEventListener('click', () => {
    // aktualizuje indeks aktualnego slajdu
    currentSlide = (currentSlide < sliderImages.length - 1) ? currentSlide + 1 : 0;
    
    // wywoluje funkcje aktualizujaca slider
    updateSlider();
});

// funkcja inicjujaca slider z odpowiednia tablica obrazow
const initSlider = (images) => {
    // przypisuje tablice obrazow do zmiennej sliderImages
    sliderImages = images;
    
    // resetuje indeks aktualnego slajdu
    currentSlide = 0;
    
    // wywoluje funkcje aktualizujaca slider
    updateSlider();
};
