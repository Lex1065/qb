// ==UserScript==
// @name         Кнопка ПЕРЕЕЗД в Админке
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add predefined text to textarea
// @author       You
// @match        https://api.qbbox.ru/admin?crudAction=addNewOrder&crudControllerFqcn=App%5CController%5CAdmin%5CUserController&entityId=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Text to be added
    var text = `<br>ПЕРЕЕЗД

<br><br>Вещи:
<br>Упаковка:
<br>Стоимость:
<br>Оплата по ссылке/карта ЛК/ ОПЛАЧЕНО

<br><br><br>Адрес 1:
<br>Кпп:
<br>паркинг:
<br>лифт:
<br>встретит:
<br>разбор:

<br><br><br>Адрес 2:
<br>Кпп:
<br>паркинг:
<br>лифт:
<br>встретит:
<br>сбор:

<br><br><br>*ЭК/Доверка
<br><br>оператор: `;

    // Create button
    var button = document.createElement("button");
    button.innerHTML = "ПЕРЕЕЗД";

    // Find textarea and add button after it
    var textarea = document.querySelector('textarea[name="comment"]');
    if (textarea) {
        textarea.parentNode.insertBefore(button, textarea.nextSibling);
    }

    // Add event listener for button click
    button.addEventListener ("click", function(event) {
        // Prevent form submission
        event.preventDefault();

        // Stop propagation of the event
        event.stopPropagation();

        // Add text to textarea
        if (textarea) {
            textarea.value = text;
            textarea.style.height = ""; // Reset the height
            textarea.style.height = Math.min(textarea.scrollHeight, window.innerHeight) + "px"; // Set the new height
        }
    });
/})();
