function modal () {
//modal window

    const btnsOpen = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        //clearInterval(modalTimerId);
    }
    //const modalTimerId = setTimeout(openModal, 1000);

    function closeModal(){
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    btnsOpen.forEach((btn) => {
        btn.addEventListener('click', openModal);
    });

    modal.addEventListener('click', (event) => {
        if(event.target === modal || event.target.getAttribute('data-close') == ''){
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if(event.code === "Escape" && modal.classList.contains('show')){
            closeModal();
        }
    });

    function showModalByScroll () {
        if(window.pageYOffset + document.documentElement.clientHeight
            >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;