function slider () {
//Slider
    const btnPrev = document.querySelector('.offer__slider-prev');
    const btnNext = document.querySelector('.offer__slider-next');
    const current = document.querySelector('#current');
    const total = document.querySelector('#total');
    const slides = document.querySelectorAll('.offer__slide');
    const slidesWrapper = document.querySelector('.offer__slider-wrapper');
    const inner = document.querySelector('.offer__slider-inner');
    const width = window.getComputedStyle(slidesWrapper).width;
    let counter = 0;
    let offset = 0;
    const slider = document.querySelector('.offer__slider');

    const dots = document.createElement('div');
    dots.classList.add('carousel-indicators');

    slider.append(dots);
    slides.forEach((slide, i, arr) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.setAttribute('data-index', i);
        dots.append(dot);
        if(i === 0){
            dot.classList.add('active');
        }
        dot.addEventListener('click', (event) => {
            counter = +event.target.dataset.index;
            showSlide(event.target.dataset.index);
        })
    });

    //увеличил ширину слайдера на колличество слайдов
    inner.style.width = parseInt(width) * slides.length + '%';

    //каждому слайду присвоил одинаковую ширину (как у родителя)
    slides.forEach(slide => {
        slide.style.width = width;
    });

    //вывел колличество слайдов
    total.innerHTML = (slides.length < 10) ? `0${+slides.length}` : +slides.length;

    //вывел текущий слайд
    current.innerHTML = (counter < 10) ? `0${counter+1}` : counter+1;

    function showSlide(index){
        offset = parseInt(width) * index;

        inner.style.transform = `translateX(-${offset}px)`;

        current.innerHTML = (counter < 10) ? `0${counter+1}` : counter+1;
    }

    function prev () {
        counter --;
        if(counter < 0){
            counter = slides.length-1;
        }
        showSlide(counter);
    }

    function next () {
        counter ++;
        if(counter === slides.length){
            counter = 0;
        }
        showSlide(counter);
    }

    btnPrev.addEventListener('click', function () {
        prev ();
    });
    btnNext.addEventListener('click', function () {
        next ();
    });
}

module.exports = slider;