// ==UserScript==
// @name         Добавление кнопок в календарь
// @namespace    http://tampermonkey.net/
// @version      2023-12-10
// @description  try to take over the world!
// @author       You
// @match        https://calendar.google.com/calendar/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function addButton(id, text, insertText) {
        // Проверяем, существует ли кнопка уже
        if (document.getElementById(id)) {
            return;
        }

        let button = document.createElement('button');
        button.id = id; // Добавляем id, чтобы мы могли найти кнопку позже
        button.textContent = text;
        button.style.marginTop = '9px'; // Добавляем отступ сверху
        button.style.marginRight = '5px'; // Добавляем отступ справа
       // button.style.marginBottom = '5px'; // Добавляем отступ снизу
        button.onclick = function() {
            let textArea = document.querySelector('div[role="textbox"]');
            if (textArea) {
                let selection = window.getSelection();
                let range = selection.getRangeAt(0);
                range.deleteContents();
                let lines = insertText.split('\n');
                for (let i = 0; i < lines.length; i++) {
                    let textNode = document.createTextNode(lines[i]);
                    range.insertNode(textNode);
                    range.setStartAfter(textNode);
                    if (i < lines.length - 1) {
                        let br = document.createElement('br');
                        range.insertNode(br);
                        range.setStartAfter(br);
                    }
                }
                selection.removeAllRanges();
                selection.addRange(range);
            }
        };
        let targetElement = document.querySelector('div[jsname="yrecld"]');
        targetElement.parentNode.insertBefore(button, targetElement.nextSibling);
    }

    let observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                addButton('myCustomButton1', 'Переезд', `Вещи:
Упаковка:
Стоимость:
Оплата по ссылке/карта ЛК/ ОПЛАЧЕНО

Адрес 1:
КПП
Паркинг
Лифт
Встретит
Разбор

Адрес 2:
КПП
Паркинг
Лифт
Встретит
Сбор

*ЭК/Доверка
Оператор:`);
                addButton('myCustomButton2', 'Возврат', `полный/частичный платный возврат
*причина для полного возврата:
тариф:
хранит: /платит:
долг:
сборка:
кпп:
паркинг:
лифт:
присутствует:
*ЭК/БКДоверка
оператор:`);
                addButton('myCustomButton3', 'Вывоз', `вещи:
*ХХ хранение ХХ вывоз (для новых)
упак. (коробки):
тариф:
хранит: / платит:
долг:
разбор:
кпп:
паркинг:
лифт:
присутствие:
*ЭК/БКДоверка
оператор:`);
            }
        });
    });

    let config = { childList: true, subtree: true };

    observer.observe(document.body, config);

/})();
