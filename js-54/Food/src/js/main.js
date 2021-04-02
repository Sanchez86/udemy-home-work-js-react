"use strict";

document.addEventListener('DOMContentLoaded', () => {
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

    })


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

    const cards = [
        {
            url: 'img/tabs/vegy.jpg',
            title: 'Меню "Фитнес"',
            description: 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
            price: 229
        },
        {
            url: 'img/tabs/elite.jpg',
            title: 'Меню “Премиум”',
            description: 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
            price: 550
        },
        {
            url: 'img/tabs/post.jpg',
            title: 'Меню "Постное"',
            description: 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
            price: 430
        }
    ]

    cards.forEach( (card) => {
        const temp = new Card(
            card.url,
            card.title,
            card.description,
            card.price,
            '.menu__field .container',
            'big',
            'menu__item'
        );
        temp.render();
    })


    // Forms

    // get all forms
    const forms = document.querySelectorAll('form');

    const messages = {
        loading: "img/modal/spinner.svg",
        access: "Данные успешно отправленны",
        fail: "Что-то пошло не так",
    };

    function formData(form){
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const elem = document.createElement('img');
            elem.classList.add('loading');
            elem.src = messages.loading;
            form.append(elem);

            const request = new XMLHttpRequest();

            request.open('POST', 'test.php');

            const formData = new FormData(form);

            request.send(formData);

            request.addEventListener('load', () => {
                if(request.status == 200){
                    form.reset();
                    showThanksModel(messages.access);
                    setTimeout(()=>{
                        elem.remove();
                    },2000);
                }else{
                    showThanksModel(messages.fail);
                    setTimeout(()=>{
                        elem.remove();
                    },2000);
                }
            })
        })
    }
    forms.forEach(form => {
        formData(form);
    });

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
    }
});
