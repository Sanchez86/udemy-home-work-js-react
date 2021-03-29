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
//console.log('bg.jpg',promoBg);
promoBg.style.backgroundImage = ("url( img/bg.jpg)");

//4) Список фильмов на странице сформировать на основании данных из этого JS файла.
// Отсортировать их по алфавиту
//5) Добавить нумерацию выведенных фильмов

let ul = document.querySelector('.promo__interactive-list');

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Одержимость",
        "Скотт Пилигрим против...",
        "Ла-ла лэнд",
    ]
};

function showFilms(){
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
}

showFilms();

let addingInput = document.querySelector('.adding__input');
let addForm = document.querySelector('form.add');
const likeFilm = document.querySelector('input[type="checkbox"]');

addForm.addEventListener('submit', function(event){
    event.preventDefault();
    if(addingInput.value){
        let temp = (addingInput.value.length > 21)? addingInput.value.slice(0, 20)+'...' : addingInput.value;
        movieDB.movies.push(temp);
        showFilms();
        if(likeFilm.checked){
            console.log('Добавляем любимый фильм');
        }
    }
    event.target.reset();
});


let deleteFilms = document.querySelectorAll('.delete');

deleteFilms.forEach(function(elem, i){
    elem.addEventListener('click', function(){
        elem.parentElement.remove();
        movieDB.movies.splice(i, 1);
        console.log(movieDB.movies, i);
        showFilms();
    });
});
// Почему-то удаляется только один элемент