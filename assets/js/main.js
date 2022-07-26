window.addEventListener('DOMContentLoaded', () => {
    /*     if (window.innerWidth < 1024) { */
    document.getElementById('headerBurgerBtn').addEventListener('click', function () {//burger-кнопка открытия меню навигации
        toggleElementScroll('.site-wrapper');
        openElement('#navigation');
        openElement('.shadow-box');
    });

    document.getElementById('navigationCloseBtn').addEventListener('click', function () {//close-кнопка закрытия меню навигации
        toggleElementScroll('.site-wrapper');
        closeElement('#navigation');
        closeElement('.shadow-box');
    });

    document.querySelector('.shadow-box').addEventListener('click', function () {//Фон-затемнение закрывающий меню навигации
        toggleElementScroll('.site-wrapper');
        closeElement('#navigation');
        closeElement('.shadow-box');
        closeElement('#modal');
    });

    document.querySelector('.open-modal').addEventListener('click', function (event) {//Ведущиая в никуда ссылка в меню навигации закрывающая меню навигации
        event.preventDefault();
        closeElement('#navigation');
        openElement('#modal');
    });
    document.querySelector('#openLoginForm').addEventListener('click', function (event) {//Ведущиая в никуда ссылка в меню навигации закрывающая меню навигации
        event.preventDefault();
        toggleElementScroll('.site-wrapper');
        openElement('.shadow-box');
        openElement('#modal');
    });

    document.querySelector('#modalRegisterBtn').addEventListener('click', function (event) {//Ведущиая в никуда ссылка в меню навигации закрывающая меню навигации
        event.preventDefault();
        openRegisterForm('#modal');
    });

    document.querySelector('#navigation')?.addEventListener('click', function (event) {//Навигация, где отслеживается клик по ссылке для закрытия самой навигации
        const target = event.target;

        if (target.classList.contains('navigation__list-link') && !target.classList.contains('open-modal')) {
            toggleElementScroll('.site-wrapper');
            closeElement('.shadow-box');
            closeElement('#navigation');
        }
    });

    const swiper = new Swiper('.destinations-slider .swiper-container', {
/*         loop: true, */
        slidesPerView: 1,
        spaceBetween: 38,
        slideToClickedSlide: true,
        speed: 1500,
        /*         autoplay: {
                    delay: 3000,
                }, */

        watchSlidesProgress: true,

        // pagination
        pagination: {
            el: '.destinations-slider .destinations-slider__tabs',
            bulletElement: 'li',
            clickable: true
        },

        // Navigation arrows
        navigation: {
            nextEl: '.destinations-slider .destinations-slider__nav-button--next',
            prevEl: '.destinations-slider .destinations-slider__nav-button--prev',
        }

    });
    /*     }; */

    console.log(
        ""
    );
});

function openRegisterForm(element) {
    document.querySelector(element).classList.add("_register");
    document.querySelector('.modal__title').innerHTML="Create account";
    document.querySelector('.modal__form-btn').innerHTML="Sign Up";
    document.querySelector('.modal__footer-text').innerHTML="Already have an account?";
    document.querySelector('#modalRegisterBtn').innerHTML="Log in";
}

function toggleElementScroll(element) {
    document.querySelector(element).classList.toggle("_false-scroll");
}

function closeElement(element) {
    document.querySelector(element).classList.remove("_active");
}

function openElement(element) {
    document.querySelector(element).classList.add("_active");
}
