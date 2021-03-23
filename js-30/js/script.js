'use strict';

//1) Удалить все рекламные блоки со страницы (правая часть сайта)
let reklama = document.querySelectorAll('.promo__adv img');
reklama.forEach(function(elem){
    elem.remove();
});

//2) Изменить жанр фильма, поменять "комедия" на "драма"
let genre = document.querySelector('.promo__genre');
genre.textContent = "драма";

//3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
// Реализовать только при помощи JS
let promoBg = document.querySelector('.promo__bg');
console.log('bg.jpg',promoBg);
promoBg.style.backgroundImage = ("url( img/bg.jpg)");

//4) Список фильмов на странице сформировать на основании данных из этого JS файла.
// Отсортировать их по алфавиту
//5) Добавить нумерацию выведенных фильмов

let ul = document.querySelector('.promo__interactive-list');
let li = document.querySelectorAll('.promo__interactive-item');

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",

        "Одержимость",
        "Скотт Пилигрим против...",
        "Ла-ла лэнд",
    ]
};

movieDB.movies.sort();

ul.innerHTML = '';

let newArr = [];
movieDB.movies.forEach((film, i) =>{
    newArr += `<li class='promo__interactive-item'>
                    ${i+1} ${film}
                    <div class="delete"></div>
                </li>`;
})

ul.innerHTML = newArr;