"use strict";
import tab    from './moules/tabs';
import card   from './moules/card';
import forms  from './moules/forms';
import timer  from './moules/timer';
import modal, {openModal} from './moules/modal';
import calc   from './moules/calc';
import slider from './moules/slider';

document.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 1000);

    tab('.tabcontent', '.tabheader__item', '.tabheader__items', 'tabheader__item_active');
    card();
    forms('form', modalTimerId);
    timer('.timer', '2021-05-10');
    modal('[data-modal]', '.modal', modalTimerId);
    calc();
    slider({
        wrapper:'.offer__slider-wrapper',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        currentCounter: '#current',
        totalCounter: '#total',
        filed: '.offer__slider-inner'
    });

});