"use strict";

document.addEventListener('DOMContentLoaded', () => {
    /*const URL = 'http://localhost:3000/';
    const ENDPOINT_MENU = 'menu';
    const ENDPOINT_REQUEST = 'requests';*/

    // Tabs

    const tabContent = document.querySelectorAll('.tabcontent'),
          tabs       = document.querySelectorAll('.tabheader__item'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabsContent() {
        tabContent.forEach((item) => {
            // item.classList.add('hide', 'fade');
            // item.classList.remove('show');
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })
    }

    function showTabsContent(i = 0) {
        // tabContent[i].classList.add('show', 'fade');
        // tabContent[i].classList.remove('hide');
        tabContent[i].style.display = 'block';

        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabsContent();
    showTabsContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {
                if(target == item){
                    hideTabsContent();
                    showTabsContent(i);
                }
            })
        }

    });

    // Timer

    const deadline = '2021-05-11';

    function getTimeRemaining(deadline){
        const difference = Date.parse(deadline) - Date.parse(new Date());
        const days       = Math.floor(difference / 1000 / 60 / 60 / 24);
        const hours      = Math.floor(difference / 1000 / 60 / 60 % 24);
        const minutes    = Math.floor((difference / 1000 / 60) % 60);
        const seconds    = Math.floor((difference / 1000) % 60);

        return {
         total : difference,
         days : days,
         hours : hours,
         minutes : minutes,
         seconds : seconds
        }
    }

    function setClock (selector, deadline) {
       const timer   = document.querySelector(selector);
       const days    = timer.querySelector('#days');
       const hours   = timer.querySelector('#hours');
       const minutes = timer.querySelector('#minutes');
       const seconds = timer.querySelector('#seconds');

       const update = setInterval(updateClock, 1000);

       function getZero (time) {
            if (time < 10){
                return '0'+time;
            }else{
                return time;
            }
       }

       function updateClock () {
           const data = getTimeRemaining(deadline);
           days.innerHTML = getZero(data.days);
           hours.innerHTML = getZero(data.hours);
           minutes.innerHTML = getZero(data.minutes);
           seconds.innerHTML = getZero(data.seconds);

           if( data.total <= 0 )
               clearInterval(update);

       }
        updateClock ();
    }

    setClock('.timer', deadline);


    //modal window

    const btnsOpen = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        //clearInterval(modalTimerId);
    }
    //const modalTimerId = setTimeout(openModal, 1000);

    function closeModal(){
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    btnsOpen.forEach((btn) => {
        btn.addEventListener('click', openModal);
    });

    modal.addEventListener('click', (event) => {
        if(event.target === modal || event.target.getAttribute('data-close') == ''){
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if(event.code === "Escape" && modal.classList.contains('show')){
            closeModal();
        }
    });

    function showModalByScroll () {
        if(window.pageYOffset + document.documentElement.clientHeight
            >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);


    //class card

    class Card {
        constructor (url, title, description, price, parent, ...classes) {
            this.url         = url;
            this.title       = title;
            this.description = description;
            this.price       = price;
            this.classes     = classes;
            this.parent      = document.querySelector(parent);
        }

        render() {
            const element = document.createElement('div');
            if(this.classes.length === 0){
                element.classList.add('menu__item');
            }else{
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                <img src=${this.url} alt=${this.title}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>`;
            this.parent.append(element);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if(!res.ok){
            throw new Error(`Не работает fetch url - ${url} и status - ${res.status}`);
        }

        return await res.json();
    };

    /*getResource('http://localhost:3000/menu')
    .then((data) => {
        data.forEach(({img, title, descr, price}) => {
            new Card(img, title, descr, price*28, '.menu__field .container').render();
        })
    });*/

    // Forms

    // get all forms
    const forms = document.querySelectorAll('form');

    const messages = {
        loading: "img/modal/spinner.svg",
        access: "Данные успешно отправленны",
        fail: "Что-то пошло не так",
    };

    /*forms.forEach(form => {
        bindPostData(form);
    });*/


    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
            },
            body: data,
        });
        return await res.json();
    };

    function bindPostData(form){
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            //add animate loader
            const elem = document.createElement('img');
            elem.classList.add('loading');
            elem.src = messages.loading;
            form.append(elem);

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModel(messages.access);
            })
            .catch(data => {
                console.log(data);
                showThanksModel(messages.fail);
            })
            .finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModel(message){
        const modalDialog = document.querySelector('.modal__dialog');
        modalDialog.classList.add('hide');
        openModal();
        const elem = document.createElement('div');
        elem.classList.add('modal__dialog');
        elem.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">×</div>
            <div class="modal__title">${message}</div>
        </div>    
        `;

        document.querySelector('.modal').append(elem);
        setTimeout(() => {
            elem.remove();
            modalDialog.classList.add('show');
            modalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    };

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

//const q = prompt('Enter something');
const str = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';
const reg = / in /g;

//console.log(str.match(reg));
//console.log(str.replace(reg, '    --000--    '));


    //Calc

    let result = document.querySelector('.calculating__result span');
    let gender = (localStorage.getItem('gender')) ? localStorage.getItem('gender') : 'female';
    let height;
    let weight;
    let age;
    let ratio = (localStorage.getItem('ratio')) ? localStorage.getItem('ratio') : 1.375;

    function initLocalData (selector, className) {
        let elements = document.querySelectorAll(selector);

        elements.forEach(el => {
            el.classList.remove(className);
            if(el.getAttribute('id') === localStorage.getItem('gender')){
                el.classList.add(className);
            }

            if(el.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                el.classList.add(className);
            }
        })

    }
    initLocalData ('.calculating__choose-item' ,'calculating__choose-item_active');

    function calcCalories () {
        if(!gender || !height || !weight || !age || !ratio){
            result.textContent = '_____';
        }else{
            if(gender === 'male'){
                result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
            }else{
                result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3* age)) * ratio);
            }
        }
    }

    function getStaticData (parentSelector, classActive) {
        const element = document.querySelectorAll(`${parentSelector} div`);

        document.querySelector(parentSelector).addEventListener('click', (event) => {
            if(event.target.matches('div.calculating__choose-item')){
                if(event.target.getAttribute('data-ratio')){
                    ratio = +event.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                }else{
                    gender = event.target.getAttribute('id');
                    localStorage.setItem('gender', gender);
                }
                element.forEach(item => {
                    item.classList.remove(classActive);
                });
                event.target.classList.add(classActive);
                calcCalories ();
            }
        });
    }

    function getDynamicData (selector) {
        let input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if(input.value.match(/\D/g)){
                input.classList.add('error');
            }else{
                input.classList.remove('error');
            }

            switch(input.getAttribute('id')){
                case 'height' :
                    height = input.value;
                    break;
                case 'weight' :
                    weight = input.value;
                    break;
                case 'age' :
                    age = input.value;
                    break;
            }
            calcCalories ();
        });
    }
    calcCalories ();
    getDynamicData('#height');
    getDynamicData('#weight');
    getDynamicData('#age');

    getStaticData('#gender', 'calculating__choose-item_active');
    getStaticData('.calculating__choose_big', 'calculating__choose-item_active');
});
