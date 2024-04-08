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
        localStorage.removeItem('qbboxData');
        localStorage.removeItem('qbboxTestData');
        localStorage.removeItem('qbboxTest1Data');
        localStorage.removeItem('qbboxTelephoneData');
    }

    window.onload = function() {
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
    };
})();
