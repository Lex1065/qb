// ==UserScript==
// @name         Вывоз вещей
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Load data from one page to another with colored blocks and clearing data after use for new orders
// @author       You
// @match        https://api.qbbox.ru/admin*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var isViewOrDetailPage = window.location.href.includes('viewUser') || window.location.href.includes('detail');
    var isAddNewOrderPage = window.location.href.includes('addNewOrder');

    if (isViewOrDetailPage) {
        // Присваивание ID нужным элементам
        var specificElement = document.getElementsByClassName('d-flex')[9];
        if (specificElement) specificElement.id = 'test';

        var specificElement1 = document.getElementsByClassName('w-100 data-row with-background field-association')[1];
        if (specificElement1) specificElement1.id = 'test1';

        var specificElement2 = document.getElementsByClassName('w-100 data-row field-association')[6];
        if (specificElement2) specificElement2.id = 'telephone';

        // Обработчик для кнопки, сохраняющий данные в localStorage
        document.querySelector('.action-index.btn.btn-success').addEventListener('click', function() {
            localStorage.setItem('qbboxData', document.querySelector('.content-header-title.d-flex.p-1').innerText);
            localStorage.setItem('qbboxTestData', document.getElementById('test').innerText);
            localStorage.setItem('qbboxTest1Data', document.getElementById('test1').innerText);
            localStorage.setItem('qbboxTelephoneData', document.getElementById('telephone').innerText);
        });
    } else if (isAddNewOrderPage) {
        // Массив с цветами для границ блоков
        var colors = ['red', 'blue', 'green', '#c494c4'];

        // Извлечение и отображение данных
        ['qbboxData', 'qbboxTestData', 'qbboxTest1Data', 'qbboxTelephoneData'].forEach(function(key, index) {
            var data = localStorage.getItem(key);
            if (data) {
                var div = document.createElement('div');
                div.style.border = '1px solid ' + colors[index];
                div.style.width = '170px';
                div.style.paddingLeft = '5px';
                div.style.marginTop = '3px';
                div.innerText = data;
                document.querySelector('.content-panel-header').appendChild(div);
            }
        });

        // Очистка localStorage после использования данных
        //localStorage.removeItem('qbboxData');
        //localStorage.removeItem('qbboxTestData');
        //localStorage.removeItem('qbboxTest1Data');
        //localStorage.removeItem('qbboxTelephoneData');
    }

    window.onload = function() {
    setTimeout(function() {
        var header = document.querySelector('.content-panel-header');
        if (header) {
            var blocks = header.querySelectorAll('div');
            var newBlock = document.createElement('div');
            newBlock.style.display = 'flex';
            newBlock.style.justifyContent = 'space-between';
            newBlock.style.marginTop = '5px';
            newBlock.style.width = '700px';

            blocks.forEach(function(block) {
                newBlock.appendChild(block.cloneNode(true));
            });

            // Очищаем предыдущие блоки перед добавлением нового
            blocks.forEach(function(block) {
                block.remove();
            });

            header.appendChild(newBlock);
        }
    }, 10); // 3 секунды в миллисекундах
};
})();



// ==UserScript==
// @name         Добавление элементов: хранит, платит, долг - в текстовое поле.
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  Присваивает ID элементам, сохраняет и вставляет значения при создании заказа на вывоз или возврата, а также копирует и вставляет значение долга.
// @author       Алексей
// @match        https://api.qbbox.ru/admin*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var isOrderPage = location.href.includes("addNewOrder");
    var isReturnOrderPage = location.href.includes("addReturnOrder");

    if (!isOrderPage && !isReturnOrderPage) {
        // Присваивание ID элементам <dt>
        var dtElements = document.getElementsByTagName('dt');
        if (dtElements.length > 2) dtElements[2].id = 'tarif'; // Присваиваем ID элементу tarif
        if (dtElements.length > 15) dtElements[15].id = 'platit'; // Присваиваем ID элементу platit
        if (dtElements.length > 16) dtElements[16].id = 'hranit'; // Присваиваем ID элементу hranit

        // Добавление обработчиков для кнопок
        var addOrderButton = document.querySelector('a.btn.btn-success[href*="addNewOrder"]');
        var addReturnOrderButton = document.querySelector('a.btn.btn-warning[href*="addReturnOrder"]');

        if (addOrderButton) {
            addOrderButton.addEventListener('click', function() {
                setTimeout(saveValues, 2); // Изменено: добавлена задержка в 0,0002 секунд
            });
        }

        if (addReturnOrderButton) {
            addReturnOrderButton.addEventListener('click', function() {
                setTimeout(saveValues, 2); // Изменено: добавлена задержка в 0,0002 секунд
            });
        }
    } else if (isOrderPage || isReturnOrderPage) {
        // Вставка значений на странице заказа или возврата
        window.addEventListener('load', function() {
            setTimeout(function() { // Изменено: добавлена задержка в 5 секунд
                var hranitValue = localStorage.getItem('hranit');
                var platitValue = localStorage.getItem('platit');
                var debtValue = localStorage.getItem('debt'); // Получаем значение долга из localStorage

                var textarea = document.querySelector('textarea[name="comment"]');
                if (textarea && hranitValue && platitValue && debtValue) {
                    // Обновляем содержимое textarea
                    textarea.value = textarea.value
                        .replace('хранит: / платит:', `хранит: ${hranitValue} / платит: ${platitValue}`)
                        .replace('долг:', `долг: ${debtValue}`);

                    // Очищаем значения в localStorage
                    //localStorage.removeItem('hranit');
                    //localStorage.removeItem('platit');
                    //localStorage.removeItem('debt');
                }
            }, 10); // Изменено: добавлена задержка в 0,0002 секунд
        });
    }

    // Функция для сохранения значений в localStorage
    function saveValues() {
        var hranitValue = document.getElementById('hranit') ? document.getElementById('hranit').innerText : '';
        var platitValue = document.getElementById('platit') ? document.getElementById('platit').innerText : '';
        var debtValueElement = document.querySelector('.badge.badge-pill');
        var debtValue = debtValueElement ? debtValueElement.innerText : '';

        localStorage.setItem('hranit', hranitValue);
        localStorage.setItem('platit', platitValue);
        localStorage.setItem('debt', debtValue);
    }
})();
