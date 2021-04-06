"use strict";

const req = new Promise(function (resolve, reject){
    let answer = +prompt('Please enter any number');
    setTimeout(function(){
        if(answer){
            resolve(answer);
        }else{
            reject('this not a number');
        }
    },1000);
});

req.then(function(data){
    return new Promise(function (resolve){
        data = data * 2;
        resolve(data);
    });
}).then(function(data){
    return new Promise(resolve => {
        let newData = {};
        newData.obj = {one: 1, two: 2};
        newData.finalSum = data;
        resolve(newData);
    })
}).then(function(data){
    console.log(data);
}).catch((dataError) => {
    console.log(dataError);
}).finally(() => {
    console.log('finally');
});


