function card () {
//class card

    class Card {
        constructor (url, title, description, price, parent, ...classes) {
            this.url         = url;
            this.title       = title;
            this.description = description;
            this.price       = price;
            this.classes     = classes;
            this.parent      = document.querySelector(parent);
        }

        render() {
            const element = document.createElement('div');
            if(this.classes.length === 0){
                element.classList.add('menu__item');
            }else{
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                <img src=${this.url} alt=${this.title}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>`;
            this.parent.append(element);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if(!res.ok){
            throw new Error(`Не работает fetch url - ${url} и status - ${res.status}`);
        }

        return await res.json();
    };

    getResource('http://localhost:3000/menu')
        .then((data) => {
            data.forEach(({img, title, descr, price}) => {
                new Card(img, title, descr, price*28, '.menu__field .container').render();
            })
        });
}

module.exports = card;