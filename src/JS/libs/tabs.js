
class Tabs {
    constructor(tabTitle, tabParent, tabItem, tabIsReset, itemsActivated, classItemActivated) {
        this.tabTitle = tabTitle;
        this.tabParent = tabParent;
        this.tabItem = tabItem;
        this.tabIsReset = tabIsReset;
        this.itemsActivated = itemsActivated;
        this.classItemActivated = classItemActivated;
    }

    resetTabs() {
        const tabTitle = document.querySelectorAll(this.tabTitle);
        const tabItem = document.querySelectorAll(this.tabItem);
        const itemsActivated = document.querySelectorAll(this.itemsActivated);

        itemsActivated.forEach(element => {
            element.classList.remove(this.classItemActivated);
        });

        tabTitle.forEach(element => {
            element.classList.remove('tabs-active');
        });

        tabItem.forEach(element => {
            element.classList.remove('tabs-show');
            element.classList.add('tabs-hide');
        });
    }

    activeTab(activeTabSelector) {
        const tabTitle = document.querySelectorAll(`${this.tabTitle}[data-tab="${activeTabSelector}"]`);
        const tabItem = document.querySelectorAll(`${this.tabItem}[data-tab="${activeTabSelector}"]`);
        const itemsActivated = document.querySelectorAll(`${this.itemsActivated}[data-tab="${activeTabSelector}"]`);

        itemsActivated.forEach(element => {
            element.classList.add(this.classItemActivated);
        });

        tabTitle.forEach(element => {
            element.classList.add('tabs-active');
        });

        tabItem.forEach(element => {
            element.classList.add('tabs-show');
            element.classList.remove('tabs-hide');
        });
    }

    render() {
        const tabTitle = document.querySelectorAll(this.tabTitle);
        const tabParent = document.querySelector(this.tabParent);
        const tabItem = document.querySelectorAll(this.tabItem);
        const itemsActivated = document.querySelectorAll(this.itemsActivated);
        if (tabTitle && tabParent && tabItem) {
            this.resetTabs();
            tabParent.addEventListener('click', (e) => {
                for (let i = 0; i < tabTitle.length; i++) {
                    if (e.target === tabTitle[i]) {
                        if (this.tabIsReset) {
                            this.resetTabs();
                        }
                        tabItem.forEach(element => {
                            if (e.target.getAttribute('data-tab') === element.getAttribute('data-tab')) {
                                if (!(this.tabIsReset)) {
                                    if (!(e.target.classList.contains('tabs-active'))) {
                                        e.target.classList.add('tabs-active');
                                        element.classList.add('tabs-show');
                                        element.classList.remove('tabs-hide');
                                        itemsActivated.forEach(item => {
                                            if (item.getAttribute('data-tab') === e.target.getAttribute('data-tab')) {
                                                item.classList.add(this.classItemActivated);
                                            }
                                        });
                                    } else {
                                        e.target.classList.remove('tabs-active');
                                        element.classList.remove('tabs-show');
                                        element.classList.add('tabs-hide');
                                        itemsActivated.forEach(item => {
                                            if (item.getAttribute('data-tab') === e.target.getAttribute('data-tab')) {
                                                item.classList.remove(this.classItemActivated);
                                            }
                                        });
                                    }
                                } else {
                                    e.target.classList.add('tabs-active');
                                    element.classList.add('tabs-show');
                                    element.classList.remove('tabs-hide');
                                    itemsActivated.forEach(item => {
                                        if (item.getAttribute('data-tab') === e.target.getAttribute('data-tab')) {
                                            item.classList.add(this.classItemActivated);
                                        }
                                    });
                                }
                            }
                        })
                    }
                }
            });
        } else {
            throw new Error('One or more items were not found (Tabs.js)');
        }
    }
}

/*
    Использование:
    1. Для того чтобы соеденить активатор, доп.активационный элемент и контент таба вы должны указать им всем атрибут
    "data-tab" с одинаковым значением например "data-tab='1'"
    2. Все табы должны находится в обёртке независимо от их количества, обёртка должна иметь селектор который в
    последствии будет указан при создании экзмепляра таба
    3. Доп.активационный элемент это элемент который будет получать класс активации параллельно с контентом таба
    с которым он находится в группе (для доп.активационного элемента необязательно нахождение в общем родителе с контентом
    или активатором таба). Класс который будет добавлятся к доп.актив.элементу нужно указать
    4. Метод activeTab активирует указанный вами таб, таб указывается по значению data-set атрибута
 
    Структура:
    new Tabs('Активатор', 'Родитель', 'Контент', 'сменить режим', 'Доп.активационный элемент', 'Класс активации для доп.активационношо элемента');
*/