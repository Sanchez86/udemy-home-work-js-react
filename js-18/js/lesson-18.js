"use strict";
console.log('18. Практика, ч3. Используем функции');

let numberOfFilms;

function start(){
    numberOfFilms = +prompt('сколько фильмов вы уже посмотрели?', "");
    while(numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms)){
        numberOfFilms = +prompt('сколько фильмов вы уже посмотрели?', "");
    }
}
start();

let persomalMoveDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    generes: [],
    privat: false,
};


function rememberMyFilms(){
    for(let i=0; i<persomalMoveDB.count; i++){
        let a = prompt('Один из последних просмотренных фильмов?', "");
        let b = +prompt('На сколько его оцение?', "");

        if(a != null && a != '' && a.length < 50 && b != null && b != ''){
            persomalMoveDB.movies[a] = b;
        }else{
            i--;
        }
    }
}
rememberMyFilms();

function detectPersonalLavel(){
    if(persomalMoveDB.count < 10){
        console.log('просмотренно мало фильмов');
    }else if(persomalMoveDB.count >= 10 && persomalMoveDB.count <30){
        console.log('вы классический зритель');
    }else if(persomalMoveDB.count > 30){
        console.log('вы кинонаркоман');
    }else{
        console.log('ошибка');
    }
}
detectPersonalLavel();

function showMyDB(){
    if(!persomalMoveDB.privat)
        console.log(persomalMoveDB);
}
showMyDB();

function writeYourGenres(){
    for(let i=1; i<=3; i++){
        let q = prompt(`Ваш любимый жанр под номером ${i}`, '');

        if(q != null && q != '' && q.length < 50){
            persomalMoveDB.generes[i-1] = q;
        }else{
            i--;
        }
    }
}
writeYourGenres();
