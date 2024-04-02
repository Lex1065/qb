// ==UserScript==
// @name         Возврат вещей
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Load data from one page to another
// @author       You
// @match        https://api.qbbox.ru/admin*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Выбираем конкретный элемент с классом "d-flex" (например, третий элемент)
    var specificElement = document.getElementsByClassName('d-flex')[9];

    // Присваиваем выбранному элементу id "test"
    if (specificElement) {
        specificElement.id = 'test';
    }

    // Выбираем конкретный элемент с классом "w-100 data-row with-background field-association" (например, второй элемент)
    var specificElement1 = document.getElementsByClassName('w-100 data-row with-background field-association')[1];

    // Присваиваем выбранному элементу id "test1"
    if (specificElement1) {
        specificElement1.id = 'test1';
    }

    // Выбираем конкретный элемент с классом "w-100 data-row field-association" (например, второй элемент)
    var specificElement2 = document.getElementsByClassName('w-100 data-row field-association')[6];

    // Присваиваем выбранному элементу id "test1"
    if (specificElement2) {
        specificElement2.id = 'telephone';
    }

    // Переменные для хранения данных
    var data, testData, test1Data, telephoneData;

    // Check which page we are on
    if (window.location.href.includes('viewUser') || window.location.href.includes('detail')) {
        // Get the data from the page
        data = document.querySelector('.content-header-title.d-flex.p-1').innerText;
        testData = document.getElementById('test').innerText;
        test1Data = document.getElementById('test1').innerText;
        telephoneData = document.getElementById('telephone').innerText;

        // Add an event listener to the button
        document.querySelector('.action-index.btn.btn-warning').addEventListener('click', function() {
            // Store the data in localStorage
            localStorage.setItem('qbboxData', data);
            localStorage.setItem('qbboxTestData', testData);
            localStorage.setItem('qbboxTest1Data', test1Data);
            localStorage.setItem('qbboxtelephoneData', telephoneData);
        });
    } else if (window.location.href.includes('addReturnOrder')) {
        // Get the data from localStorage
        data = localStorage.getItem('qbboxData');
        testData = localStorage.getItem('qbboxTestData');
        test1Data = localStorage.getItem('qbboxTest1Data');
        telephoneData = localStorage.getItem('qbboxtelephoneData');

        // Add the data to the page in separate divs with borders and styles
        var div1 = document.createElement('div');
        div1.style.border = '1px solid red';
        div1.style.width = '170px';
        div1.style.paddingLeft = '5px';
        div1.style.marginTop = '3px';
        div1.innerText = data;

        var div2 = document.createElement('div');
        div2.style.border = '1px solid blue';
        div2.style.width = '170px';
        div2.style.paddingLeft = '5px';
        div2.style.marginTop = '3px';
        div2.innerText = testData;

        var div3 = document.createElement('div');
        div3.style.border = '1px solid green';
        div3.style.width = '170px';
        div3.style.paddingLeft = '5px';
        div3.style.marginTop = '3px';
        div3.innerText = test1Data;

        var div4 = document.createElement('div');
        div4.style.border = '1px solid #c494c4';
        div4.style.width = '170px';
        div4.style.paddingLeft = '5px';
        div4.style.marginTop = '3px';
        div4.innerText = telephoneData;

        // Append the divs to the content-panel-header
        document.querySelector('.content-panel-header').appendChild(div1);
        document.querySelector('.content-panel-header').appendChild(div2);
        document.querySelector('.content-panel-header').appendChild(div3);
        document.querySelector('.content-panel-header').appendChild(div4);
    }

    window.onload = function() {
        var header = document.querySelector('.content-panel-header');
        var blocks = Array.from(header.querySelectorAll('div'));

        // Создаем новый блок для хранения остальных блоков
        var newBlock = document.createElement('div');
        newBlock.style.display = 'flex';
        newBlock.style.justifyContent = 'space-between';
        newBlock.style.marginTop = '5px';
        newBlock.style.width = '700px';

        // Перемещаем блоки в новый блок
        blocks.forEach(function(block) {
            newBlock.appendChild(block);
        });

        // Добавляем новый блок в заголовок
        header.appendChild(newBlock);
    };

    
})();
