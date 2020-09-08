"use strict";
console.log('15. Практика, ч2. Применяем условия и циклы');

let numberOfFilms = +prompt('сколько фильмов вы уже посмотрели?', "");

let persomalMoveDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    generes: [],
    privat: false,
};

if(persomalMoveDB.count < 10){
    console.log('просмотренно мало фильмов');
}else if(persomalMoveDB.count >= 10 && persomalMoveDB.count <30){
    console.log('вы классический зритель');
}else if(persomalMoveDB.count > 30){
    console.log('вы кинонаркоман');
}else{
    console.log('ошибка');
}

for(let i=0; i<persomalMoveDB.count; i++){
    let a = prompt('Один из последних просмотренных фильмов?', "");
    let b = +prompt('На сколько его оцение?', "");
    
    if(a != null && a != '' && a.length < 50 && b != null && b != ''){
        persomalMoveDB.movies[a] = b;
    }else{
        i--;
    }
}

/*
let i=0;
while( i<persomalMoveDB.count ){
    let a = prompt('Один из последних просмотренных фильмов?', "");
    let b = +prompt('На сколько его оцение?', "");
    
    if(a != null && a != '' && a.length < 50 && b != null && b != ''){
        persomalMoveDB.movies[a] = b;
    }else{
        i--;
    }
    i++;
}
*/
/*
let i=0;
do{
    let a = prompt('Один из последних просмотренных фильмов?', "");
    let b = +prompt('На сколько его оцение?', "");
    
    if(a != null && a != '' && a.length < 50 && b != null && b != ''){
        persomalMoveDB.movies[a] = b;
    }else{
        i--;
    }
    i++;
}
while( i<persomalMoveDB.count );
*/

console.log(persomalMoveDB);