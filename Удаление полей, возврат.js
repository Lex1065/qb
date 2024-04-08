// ==UserScript==
// @name         Удаление полей, возврат
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://api.qbbox.ru/admin?crudAction=addReturnOrder&crudControllerFqcn=App%5CController%5CAdmin%5CUserController&entityId=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Выбираем конкретный элемент с классом "field-text form-group" (например, третий элемент)
    var specificElement = document.getElementsByClassName('field-text form-group')[4];

    // Присваиваем выбранному элементу id "test7"
    if (specificElement) {
        specificElement.id = 'test7';
    }

    // Выбираем конкретный элемент с классом "field-text form-group" (например, второй элемент)
    var specificElement1 = document.getElementsByClassName('field-text form-group')[5];

    // Присваиваем выбранному элементу id "test8"
    if (specificElement1) {
        specificElement1.id = 'test8';
    }

   

    // Задержка выполнения кода на 2 секунды
    setTimeout(function() {
        var ids = ['test7', 'test8'];
        for (var i = 0; i < ids.length; i++) {
            var element = document.getElementById(ids[i]);
            if (element) {
                element.parentNode.removeChild(element);
            }
        }
    }, 1); // 2000 миллисекунд = 2 секунды


    // Задержка выполнения кода на 2 секунды
setTimeout(function() {
    // Поле для комментария
    var commentField = document.querySelector('textarea[name="comment"]');
    if (commentField) {
        commentField.value = '<br>полный/частичный платный возврат\n<br>*причина для полного возврата:\n<br>хранит: / платит:\n<br>долг:\n<br>сборка:\n<br>кпп:\n<br>паркинг:\n<br>лифт:\n<br>присутствует:\n<br>*ЭК/БКДоверка\n<br>оператор:\n<br>';
        commentField.style.height = '300px';
        commentField.style.overflowY = 'hidden';
        commentField.addEventListener('input', function () {
            this.style.height = '300px';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }
}, 1);


    // Удлиняем поле адрес по мере заполнения
setTimeout(function() {
        var inputField = document.querySelector('input[name="address"]');
        if (inputField) {
            inputField.style.width = '350px';
            inputField.style.maxWidth = '350px';
            inputField.style.overflowX = 'hidden';
            inputField.oninput = function() {
                this.style.width = '350px';
                this.style.maxWidth = '800px';
                this.style.width = (this.scrollWidth) + 'px';
            };
        }
    }, 1); // Задержка в 2000 миллисекунд, или 2 секунды










})();
