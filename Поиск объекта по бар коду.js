// ==UserScript==
// @name         Управление перемещением и чекбоксами объектов по баркоду с выделением названий
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Перемещает объекты по баркоду, выделяет названия зеленым жирным шрифтом при выделении чекбоксов, и предотвращает отправку формы при нажатии Enter.
// @author       You
// @match        https://api.qbbox.ru/admin?crudAction=addReturnOrder&crudControllerFqcn=App%5CController%5CAdmin%5CUserController&entityId=*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(`
        .highlight {
            color: green !important;
            font-weight: bold !important;
        }
        .countLabel {
            display: block;
            color: green !important;
            margin-bottom: 0px;
            font-weight: bold !important;
        }
        #selectedItemsContainer {
            margin-top: 20px;
            //border: 1px solid #ccc;
            padding: 0px;
            background-color: #dee2e6b0;
        }
    `);

    let originalPositions = new Map();

    function updateCounter() {
        const markedItems = document.querySelectorAll('#selectedItemsContainer .highlight').length;
        const countLabel = document.getElementById('markedCount');
        countLabel.textContent = `Выделено: ${markedItems}`;
    }

    function toggleObjectByBarcode(barcode, shouldBeMoved) {
        const objects = document.querySelectorAll("label[for^='object_']");
        objects.forEach(label => {
            const objectBarcode = label.textContent.match(/\b\d{6}\b/)[0];
            if (objectBarcode === barcode) {
                const objectDiv = label.closest('div');
                const checkbox = label.querySelector("input[type=checkbox]");
                if (shouldBeMoved) {
                    if (!originalPositions.has(objectDiv)) {
                        let nextSibling = objectDiv.nextSibling;
                        let parent = objectDiv.parentNode;
                        originalPositions.set(objectDiv, {parent, nextSibling});
                        document.getElementById('selectedItemsContainer').appendChild(objectDiv);
                        checkbox.checked = true;
                        label.classList.add('highlight');
                    }
                } else if (originalPositions.has(objectDiv)) {
                    returnObjectToOriginalPosition(objectDiv);
                }
            }
        });
        updateCounter();
    }

    function returnObjectToOriginalPosition(objectDiv) {
        const positionInfo = originalPositions.get(objectDiv);
        if (positionInfo) {
            const label = objectDiv.querySelector("label[for^='object_']");
            const checkbox = label.querySelector("input[type=checkbox]");
            if (positionInfo.nextSibling) {
                positionInfo.parent.insertBefore(objectDiv, positionInfo.nextSibling);
            } else {
                positionInfo.parent.appendChild(objectDiv);
            }
            checkbox.checked = false;
            label.classList.remove('highlight');
            originalPositions.delete(objectDiv);
            updateCounter();
        }
    }

    // Создание интерфейса пользователя
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.marginTop = '10px';
    container.style.marginLeft = '18.6%';

    const countLabel = document.createElement('span');
    countLabel.id = 'markedCount';
    countLabel.className = 'countLabel';
    countLabel.textContent = 'Выделено: 0';
    container.appendChild(countLabel);

    const barcodeInput = document.createElement('input');
    barcodeInput.type = 'text';
    barcodeInput.placeholder = 'Введите баркоды через пробел или запятую';
    barcodeInput.style.marginRight = '10px';
    barcodeInput.style.width = '350px';
    barcodeInput.style.marginLeft = '10px';
    barcodeInput.style.padding = '5px';
    barcodeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            button.click();
        }
    });
    container.appendChild(barcodeInput);

    const button = document.createElement('button');
    button.textContent = 'Добавить позиции';
    button.style.padding = '5px';
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const barcodes = new Set(barcodeInput.value.trim().split(/[,\s]+/).filter(Boolean));
        originalPositions.forEach((_, objectDiv) => {
            const label = objectDiv.querySelector("label[for^='object_']");
            const objectBarcode = label.textContent.match(/\b\d{6}\b/)[0];
            if (!barcodes.has(objectBarcode)) {
                returnObjectToOriginalPosition(objectDiv);
            }
        });
        barcodes.forEach(barcode => toggleObjectByBarcode(barcode, true));
    });
    container.appendChild(button);

    // Определение места вставки элементов управления
    const selectAllElement = document.querySelector("div.form-group div.form-widget input#selectAll").parentNode.parentNode;
    selectAllElement.parentNode.insertBefore(container, selectAllElement.nextSibling);

    const selectedItemsContainer = document.createElement('div');
    selectedItemsContainer.id = 'selectedItemsContainer';
    selectAllElement.parentNode.insertBefore(selectedItemsContainer, container.nextSibling);

    updateCounter(); // Инициализация счетчика
/})();
