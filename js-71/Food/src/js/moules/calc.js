function calc () {
//Calc

    let result = document.querySelector('.calculating__result span');
    let gender = (localStorage.getItem('gender')) ? localStorage.getItem('gender') : 'female';
    let height;
    let weight;
    let age;
    let ratio = (localStorage.getItem('ratio')) ? localStorage.getItem('ratio') : 1.375;

    function initLocalData (selector, className) {
        let elements = document.querySelectorAll(selector);

        elements.forEach(el => {
            el.classList.remove(className);
            if(el.getAttribute('id') === localStorage.getItem('gender')){
                el.classList.add(className);
            }

            if(el.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                el.classList.add(className);
            }
        })

    }
    initLocalData ('.calculating__choose-item' ,'calculating__choose-item_active');

    function calcCalories () {
        if(!gender || !height || !weight || !age || !ratio){
            result.textContent = '_____';
        }else{
            if(gender === 'male'){
                result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
            }else{
                result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3* age)) * ratio);
            }
        }
    }

    function getStaticData (parentSelector, classActive) {
        const element = document.querySelectorAll(`${parentSelector} div`);

        document.querySelector(parentSelector).addEventListener('click', (event) => {
            if(event.target.matches('div.calculating__choose-item')){
                if(event.target.getAttribute('data-ratio')){
                    ratio = +event.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                }else{
                    gender = event.target.getAttribute('id');
                    localStorage.setItem('gender', gender);
                }
                element.forEach(item => {
                    item.classList.remove(classActive);
                });
                event.target.classList.add(classActive);
                calcCalories ();
            }
        });
    }

    function getDynamicData (selector) {
        let input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if(input.value.match(/\D/g)){
                input.classList.add('error');
            }else{
                input.classList.remove('error');
            }

            switch(input.getAttribute('id')){
                case 'height' :
                    height = input.value;
                    break;
                case 'weight' :
                    weight = input.value;
                    break;
                case 'age' :
                    age = input.value;
                    break;
            }
            calcCalories ();
        });
    }
    calcCalories ();
    getDynamicData('#height');
    getDynamicData('#weight');
    getDynamicData('#age');

    getStaticData('#gender', 'calculating__choose-item_active');
    getStaticData('.calculating__choose_big', 'calculating__choose-item_active');
});
}

module.exports = calc;