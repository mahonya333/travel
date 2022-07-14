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
        });
    
        document.querySelector('.close-navigation').addEventListener('click', function (event) {//Ведущиая в никуда ссылка в меню навигации закрывающая меню навигации
            event.preventDefault();
            closeElement('#navigation');
            closeElement('.shadow-box');
        });

        document.querySelector('#navigation')?.addEventListener('click', function (event) {//Навигация, где отслеживается клик по ссылке для закрытия самой навигации
            const target = event.target
    
            if (target.classList.contains('navigation__list-link')) {
                toggleElementScroll('.site-wrapper');
                closeElement('.shadow-box');
                closeElement('#navigation');

            }
        });
/*     }; */

    console.log(
        "Вёрстка соответствует макету. Ширина экрана 390px - выполнено (+48)\nНи на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется - выполнено (+15)\nНа ширине экрана 390рх и меньше реализовано адаптивное меню - выполнено (+22)\nИтого 85 баллов\nХОРОШЕГО ДНЯ:)"
    );
});

function toggleElementScroll(element) {
    document.querySelector(element).classList.toggle("_false-scroll");
}

function closeElement(element) {
    document.querySelector(element).classList.remove("_active");
}

function openElement(element) {
    document.querySelector(element).classList.add("_active");
}
