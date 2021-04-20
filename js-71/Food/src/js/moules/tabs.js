function tabs (tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // Tabs

    const tabContent = document.querySelectorAll(tabsSelector);
    const tabs       = document.querySelectorAll(tabsContentSelector);
    const tabsParent = document.querySelector(tabsParentSelector);

    function hideTabsContent() {
        tabContent.forEach((item) => {
            item.classList.add('hide', 'fade');
            item.classList.remove('show');
            //item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        })
    }

    function showTabsContent(i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        // tabContent[i].style.display = 'block';

        tabs[i].classList.add(activeClass);
    }

    hideTabsContent();
    showTabsContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {
                if(target == item){
                    hideTabsContent();
                    showTabsContent(i);
                }
            })
        }

    });
}

export default tabs;