'use strict';
const inputUah = document.querySelector('#uah'),
      inputUsd = document.querySelector('#usd');

inputUah.addEventListener('input', (event) => {
   event.preventDefault();

   const request = new XMLHttpRequest(); // экземпляр класса для запроса

    /*open(method, url)
            method - определяет метод запроса (GET или POST)
            url - путь к серверу (файл или реальный сервер. без разницы)
            Ajax запросы явзялются по умолчанию асинхронным кодом
            (который не блокирует работу остального кода)
    */

    // метод для настроек, которые в будущем помогут сделать запрос
    request.open('GET', 'js/current.json');

   /*setRequestHeader - уточняем запрос. что именно отправляем и какая кодировка
    чтоб сервер понимал, что он принимает в себя (json файл или изображение)
    'application/json - заголовок для передачи json файлов
    кодировку устанавливать не обязательно*/
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    //отправляем запрос
    request.send();

    //событие load - срабатывает только один раз, когда запрос полностью готов
    request.addEventListener('load', () => {
        if(request.status == 200){
            //request.response - тут лежит ответ от сервера в json формате
            //JSON.parse - перевожу json объект в обычный js объект
            const data = JSON.parse(request.response);
            inputUsd.value = (+inputUah.value / data.current.usd).toFixed(2);
        }else{
            inputUsd.value = 'Error connecting with server'
        }
    });

    //status- получение статуса от сервера

    //response - ответ от сервера (код, который буду использовать)

    //readyState - текущее состояне запроса (0,1,2,3,4)

});