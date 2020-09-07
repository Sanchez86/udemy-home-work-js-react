"use strict";
console.log('12. Практика, ч.1. Начинаем создавать приложение');

//1
let numberOfFilms = +prompt('сколько фильмов вы уже посмотрели?', "");

//2
let persomalMoveDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    generes: [],
    privat: false,
};

//3
function questions(){
    let lastFilms = prompt('Один из последних просмотренных фильмов?', "");
    let ratingFilms = +prompt('На сколько его оцение?', "");
    persomalMoveDB.movies[lastFilms] = ratingFilms;
    console.log('test')
}

questions();
questions();

console.log(persomalMoveDB);