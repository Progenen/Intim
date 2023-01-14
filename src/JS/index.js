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
                <div class="mobile-menu__title">${element.querySelector(itemTitle).innerText}</div>
            </div>
            `;
            item.append(element.querySelector(itemContent));
            element.querySelector(itemBtn).addEventListener('click', () => {
                item.classList.toggle('active');
            });
            item.querySelector('.mobile-menu__back').addEventListener('click', () => {
                item.classList.toggle('active');
            })

            document.querySelector('html').append(item);
        });
    }

    // Smooth scroll
    $("a[href^='#']").on("click", function () {
        let href = $(this).attr("href");
    
        $("html, body").animate({
            scrollTop: $(href).offset().top
        });
    
        return false;
    });

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

    if (responsive(680)) {
        mainMenu.menu.append(location);
        mobileMenu('.header__location-list__item', '.header__location-list__sub', '.header__location-text', '.header__location-text');
        if (document.querySelector('.profile-main-nav')) {
            const profileNavTabs = new Tabs('.profile-main-nav__item', '.profile-main', '.tab-content', true);
            profileNavTabs.render();
            profileNavTabs.activeTab('photo');
        }
    }


    // Map optimize 
    if (document.getElementById('map_container')) {


        function start_lazy_map() {
            if (!map_loaded) {
                let map_block = document.getElementById('ymap_lazy');
                map_loaded = true;
                map_block.setAttribute('src', map_block.getAttribute('data-src'));
                map_block.removeAttribute('data_src');
                console.log('YMAP LOADED');
            }
        }

        let map_loaded = false;

        let map_container = document.getElementById('map_container');
        let options_map = {
            once: true,//запуск один раз, и удаление наблюдателя сразу
            passive: true,
            capture: true
        };

        
        map_container.addEventListener('click', start_lazy_map, options_map);
        map_container.addEventListener('mouseover', start_lazy_map, options_map);
        map_container.addEventListener('touchstart', start_lazy_map, options_map);
        map_container.addEventListener('touchmove', start_lazy_map, options_map);
    }


    // Video in modal

    if (document.querySelector("[data-video]")) {
        const video = document.querySelectorAll('[data-video]');
        const videoIframe = document.querySelector("video");
        const videoBody = document.querySelector(".modal-video__body");
        const newModal = new MinModalJS('.modal-video', {
            buttonsActive: '[data-video]',
            buttonsDisActive: '.modal-video__close',
            keyOpen: false, // Or false
            modalOutsideClick: true, // if true, modal closed when you click outside content modal
            whenModalClose: function () {
                videoIframe.pause();
            }
        });
        video.forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                if (videoIframe.getAttribute('src') != element.getAttribute('href')) {
                    videoIframe.src = element.getAttribute('href');
                }
            });
        });
    }


    // Tabs ankets

    if (document.querySelector(".profile-main__sim")) {
        const tabsAnkets = new Tabs('.profile-main__sim-header-item', '.profile-main__sim', '.profile-main__sim-items', true);
        tabsAnkets.render();
        tabsAnkets.activeTab('recAnkets');
    }


    // Slider 

    if (document.querySelector(".profile-main-info__slider")) {
        $('.profile-main-info__slider-main').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
            customPaging: function (slick, index) {
                var image = $(slick.$slides[index]).find('.profile-main-info__slider-main-img').attr('src');
                return `<img src="${image}" alt="" /> `
            }
        });
    }

    // profile-main-nav

    if (document.querySelector(".profile-main-nav") && document.body.clientWidth >= 680) {
        window.addEventListener('scroll', () => {
            document.querySelectorAll(".profile-main__block").forEach((element, i) => {
                if (element.offsetTop - 30 <= window.scrollY) {
                    document.querySelectorAll(".profile-main-nav__item").forEach(element => {
                        if (element.classList.contains('tabs-active')) {
                            element.classList.remove('tabs-active')
                        }
                    })
                    document.querySelectorAll('.profile-main-nav__item')[i].classList.add('tabs-active');
                }
            })
        })
    }

    if (document.querySelector('.profile__modal-form')) {
        const raiting = document.querySelectorAll('.profile__modal-form-radio');
        const raitingStars = document.querySelector(".profile__modal-form-raiting-stars-rect");
        const modalBtn = document.querySelectorAll(".profile__modal-toggle");
        const modal = document.querySelector(".profile__modal-bg");

        raiting.forEach((element, i) => {
            element.addEventListener("mouseover", () => {
                let index = i + 1;
                raitingStars.setAttribute("x", (index / 0.005) / 20 + "%");
            });
            if (element.isChecked) {
                raitingStars.setAttribute("x", (index / 0.005) / 20 + "%");
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
    if (responsive(860)) {
        mainMenu.menu.append(sidebar);
        mobileMenu('.sidebar-tags__item', '.sidebar-tags__item-list', '.sidebar-tags-item__title', '.sidebar-tags-item__title');
    }

    if (responsive(440)) {
        mainMenu.menu.prepend(catalogHeader)
    }


});