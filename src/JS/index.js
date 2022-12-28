document.addEventListener('DOMContentLoaded', function () {

    // Functions

    function responsive(width) {
        if (document.body.clientWidth <= width) {
            return true;
        }
    }

    function mobileMenu(item, itemContent, itemTitle, itemBtn) {
        const menuCatalog = document.querySelectorAll(item);
        menuCatalog.forEach((element, i) => {
            let item = document.createElement('div');
            item.classList.add('mobile-menu');
            item.innerHTML = `
            <div class="mobile-menu__header">
                <div class="mobile-menu__back" id="back${i}">
                    <svg class="mobile-menu__back-icon">
                        <use xlink:href='svg/dest/stack/sprite.svg#arrow'></use>
                    </svg>
                </div>
                <div class="mobile-menu__title">${element.querySelector(itemTitle).innerText || element.querySelector(itemTitle).textContent}</div>
            </div>
            `;
            item.append(element.querySelector(itemContent));
            console.log(element);
            element.querySelector(itemBtn).addEventListener('click', () => {
                item.classList.toggle('active');
            });
            item.querySelector('.mobile-menu__back').addEventListener('click', () => {
                item.classList.toggle('active');
            })
            
            document.querySelector('html').append(item);
        });
    }

    // Burger menu (Header)

    class MainMenu {
        constructor() {
            this.menu = document.querySelector('[data-menu]');
            this.body = document.body;
            this.menuBtn = document.querySelectorAll('[data-menu-btn]');
        }

        openMenu = (i) => {
            this.menu.classList.add('active');
            this.body.classList.add('lock');
            this.menuBtn[i].classList.add('active');
        }

        closeMenu = (i) => {
            this.menu.classList.remove('active');
            this.body.classList.remove('lock');
            this.menuBtn[i].classList.remove('active');
        }

        render() {
            this.menuBtn.forEach((element, i) => {
                element.addEventListener('click', (e) => {
                    if (this.menu.classList.contains('active')) {
                        this.closeMenu(i);
                    } else {
                        this.openMenu(i);
                    }
                })
            })
        }
    }

    const mainMenu = new MainMenu;
    mainMenu.render();

    const location = document.querySelector('.header__location');
    const sidebar = document.querySelector('.sidebar');
    const catalogHeader = document.querySelector('.main-top-menu__list');


    // Slider 

    if (document.querySelector(".profile-main-info__slider")) {
        $('.profile-main-info__slider-main').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
            customPaging: function(slick, index) {
                var image = $(slick.$slides[index]).find('.profile-main-info__slider-main-img').attr('src');
                console.log($(slick.$slides[index]));
                return `<img src="${ image }" alt="" /> `
              }
          });
    }

    // profile-main-nav

    if (document.querySelector(".profile-main-nav") && document.body.clientWidth >= 680) {

        window.addEventListener('scroll', () => {
            document.querySelectorAll(".profile-main__block").forEach((element, i) => {
                if (element.offsetTop - 30 <= window.scrollY) {
                    document.querySelectorAll(".profile-main-nav__item").forEach(element => {
                        if (element.classList.contains('active')) {
                            element.classList.remove('active')
                        }
                    })
                    document.querySelectorAll('.profile-main-nav__item')[i].classList.add('active');
                }
            })
        })
    }

    if(document.querySelector('.profile__modal-form')) {
        const raiting = document.querySelectorAll('.profile__modal-form-radio');
        const raitingStars = document.querySelector(".profile__modal-form-raiting-stars-rect");
        const modalBtn = document.querySelectorAll(".profile__modal-toggle");
        const modal = document.querySelector(".profile__modal-bg");

        raiting.forEach((element, i) => {
            element.addEventListener("mouseover", () => {
                console.log('ok');
                let index = i + 1;
                raitingStars.setAttribute("x",  (index / 0.005) / 20 +  "%");
            }) ;
            if (element.isChecked) {
                raitingStars.setAttribute("x",  (index / 0.005) / 20 +  "%");
            }
        });

        modalBtn.forEach(element => {
            element.addEventListener('click', () => {
                document.querySelector('html').classList.toggle('lock');
                document.querySelector('.wrapper').classList.toggle('lock');
                modal.classList.toggle('active')
            })
        });

    }   

    

    

    if (responsive(680)) {
        mainMenu.menu.append(location);
        mobileMenu('.header__location-list__item', '.header__location-list__sub', '.header__location-text', '.header__location-text');
        if (document.querySelector('.profile-main-nav')) {
            const profileNavItem = document.querySelectorAll('[data-tab-title]');
            const profileBlock = document.querySelectorAll("[data-tab]");

            profileNavItem.forEach((el, i) => {
                el.addEventListener('click', () => {
                    profileNavItem.forEach((element, n) => {
                        element.classList.remove('active');
                        profileBlock[n].classList.remove('show');
                    });
                    profileBlock.forEach(element => {
                        if (element.getAttribute('data-tab') === el.getAttribute('data-tab-title')) {
                            element.classList.add('show');
                            el.classList.add('active');
                        }
                    });
                })
            });
        }
        
        
    }
    if (responsive(860)) {
        mainMenu.menu.append(sidebar);
        mobileMenu('.sidebar-tags__item', '.sidebar-tags__item-list', '.sidebar-tags-item__title', '.sidebar-tags-item__title');
    }

    if(responsive(440)) {
        mainMenu.menu.prepend(catalogHeader)
    }

   
});