function timer () {
// Timer

    const deadline = '2021-05-11';

    function getTimeRemaining(deadline){
        const difference = Date.parse(deadline) - Date.parse(new Date());
        const days       = Math.floor(difference / 1000 / 60 / 60 / 24);
        const hours      = Math.floor(difference / 1000 / 60 / 60 % 24);
        const minutes    = Math.floor((difference / 1000 / 60) % 60);
        const seconds    = Math.floor((difference / 1000) % 60);

        return {
            total : difference,
            days : days,
            hours : hours,
            minutes : minutes,
            seconds : seconds
        }
    }

    function setClock (selector, deadline) {
        const timer   = document.querySelector(selector);
        const days    = timer.querySelector('#days');
        const hours   = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');

        const update = setInterval(updateClock, 1000);

        function getZero (time) {
            if (time < 10){
                return '0'+time;
            }else{
                return time;
            }
        }

        function updateClock () {
            const data = getTimeRemaining(deadline);
            days.innerHTML = getZero(data.days);
            hours.innerHTML = getZero(data.hours);
            minutes.innerHTML = getZero(data.minutes);
            seconds.innerHTML = getZero(data.seconds);

            if( data.total <= 0 )
                clearInterval(update);

        }
        updateClock ();
    }

    setClock('.timer', deadline);
}

module.exports = timer;