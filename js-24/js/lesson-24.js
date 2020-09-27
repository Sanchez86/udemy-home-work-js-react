"use strict";
console.log('24. Практика , ч4. Используем объекты');

let personalMoveDB = {
    count: 0,
    movies: {},
    actors: {},
    generes: [],
    privat: false,
    start: function (){
        personalMoveDB.count = +prompt('сколько фильмов вы уже посмотрели?', "");
        while(personalMoveDB.count == '' || personalMoveDB.count == null || isNaN(personalMoveDB.count)){
            personalMoveDB.count = +prompt('сколько фильмов вы уже посмотрели?', "");
        }
    },
    rememberMyFilms: function (){
        for(let i=0; i<personalMoveDB.count; i++){
            let a = prompt('Один из последних просмотренных фильмов?', "");
            let b = +prompt('На сколько его оцение?', "");
            
            if(a != null && a != '' && a.length < 50 && b != null && b != ''){
                personalMoveDB.movies[a] = b;
            }else{
                i--;
            }
        }
    },
    detectPersonalLavel:function (){
        if(personalMoveDB.count < 10){
            console.log('просмотренно мало фильмов');
        }else if(personalMoveDB.count >= 10 && personalMoveDB.count <30){
            console.log('вы классический зритель');
        }else if(personalMoveDB.count > 30){
            console.log('вы кинонаркоман');
        }else{
            console.log('ошибка');
        }
    },
    showMyDB: function() {
        if(!personalMoveDB.privat)
            console.log(personalMoveDB);
    },
    writeYourGenres: function (){
        for(let i=1; i<=3; i++){
            let q = prompt(`Ваш любимый жанр под номером ${i}`, '');
            
            if(q != null && q != ''){
                personalMoveDB.generes[i-1] = q;
            }else{
                i--;
            }
        }
        personalMoveDB.generes.forEach(function(item, i){
            console.log(`Любисый жанр #${i + 1} - это ${item}`);
        });
    },
    toggleVisibleMyDB: function(){
        if(personalMoveDB.privat){
            personalMoveDB.privat = false;
        }else{
            personalMoveDB.privat = true;
        }
    },
};
//personalMoveDB.start();
//personalMoveDB.rememberMyFilms();
//personalMoveDB.detectPersonalLavel();
personalMoveDB.writeYourGenres();
personalMoveDB.showMyDB();
//personalMoveDB.toggleVisibleMyDB();

