import {openModal, closeModal} from "./modal";
import {postData} from "../services/services";

function forms (formSelector, modalTimerId) {

    // get all forms
    const forms = document.querySelectorAll(formSelector);

    const messages = {
        loading: "img/modal/spinner.svg",
        access: "Данные успешно отправленны",
        fail: "Что-то пошло не так",
    };

    forms.forEach(form => {
        bindPostData(form);
    });


    function bindPostData(form){
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            //add animate loader
            const elem = document.createElement('img');
            elem.classList.add('loading');
            elem.src = messages.loading;
            form.append(elem);

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModel(messages.access);
                })
                .catch(data => {
                    console.log(data);
                    showThanksModel(messages.fail);
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModel(message){
        const modalDialog = document.querySelector('.modal__dialog');
        modalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);
        const elem = document.createElement('div');
        elem.classList.add('modal__dialog');
        elem.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">×</div>
            <div class="modal__title">${message}</div>
        </div>    
        `;

        document.querySelector('.modal').append(elem);
        setTimeout(() => {
            elem.remove();
            modalDialog.classList.add('show');
            modalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    };
}

export default forms;