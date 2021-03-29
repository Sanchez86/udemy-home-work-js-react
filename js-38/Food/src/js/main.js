"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const tabContent       = document.querySelectorAll('.tabcontent'),
          tabs    = document.querySelectorAll('.tabheader__item'),
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
    // console.log(123);
});