// ==UserScript==
// @name         Выдвижная панель с кнопками Вика
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Создает выдвижную панель, которая появляется слева, с кнопками, открывающими ссылки в этой же странице
// @author       Вы
// @match        https://airtable.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Создайте элемент div для панели
    var panel = document.createElement('div');
    panel.id = 'slide-panel';
    panel.style.position = 'fixed';
    panel.style.top = '145px';
    panel.style.left = '-260px';
    panel.style.width = '260px';
    panel.style.height = '100%';
    panel.style.backgroundColor = '#ffffff';
    panel.style.zIndex = '9999';
    panel.style.transition = 'left 0.5s';

    // Добавьте кнопки с ссылками на панель
    var links = [
        {name: 'Kanban 2', url: 'https://airtable.com/appBau9E3oQ0EX8Ek/tbllelNfbtvKVbZCX/viwa5dwr5C0TNeaLx?blocks=hide'},
        {name: 'Ежедневный отчет', url: 'https://airtable.com/appBau9E3oQ0EX8Ek/tbllelNfbtvKVbZCX/viwK8tOTAvOX0HfPc?blocks=hide'},
        {name: 'Отложенные лиды', url: 'https://airtable.com/appBau9E3oQ0EX8Ek/tbllelNfbtvKVbZCX/viwiSQS84dM8VkV8R?blocks=hide'},
        {name: 'Причины полного возврата', url: 'https://airtable.com/appBau9E3oQ0EX8Ek/tbl5bfHsg1mLypwvt/viwnDcqJnT71kz3Dy?blocks=hide'},
        {name: 'Бонусы', url: 'https://airtable.com/appticn5kKWyliK9M/tblMzwZokAON0YOrt/viwmK5R9RJPZCfRjE?blocks=hide'},
        {name: 'Тикеты', url: 'https://airtable.com/appmsLDbJYnV2qjC6/tblHthJNsGm5iNdt4/viw6LjRpE3HUPEFW2?blocks=hide'},
        {name: 'Промокоды', url: 'https://airtable.com/appBau9E3oQ0EX8Ek/tbl3096eHL9cqmCiK/viwsejFZP86diUXqQ?blocks=hide'},
        {name: 'Трекер склада', url: 'https://airtable.com/appK8aMxsbT7hB5mB/tblPLh0fpa4ONrnKT/viwFAWy9WpgEeQLMO?blocks=hide'},
        {name: 'Проверка ссылок на оплату', url: 'https://airtable.com/appticn5kKWyliK9M/tblEq81eTjddcrzmJ/viwsA7eMK4GaX6d81?blocks=hide'},
        {name: 'Архив перехода на в4', url: 'https://airtable.com/appBau9E3oQ0EX8Ek/tbllelNfbtvKVbZCX/viwp3c5Aba3DqKrKB?blocks=hide'},

        // Добавьте остальные ссылки здесь...
    ];
    links.forEach(function(link) {
        var button = document.createElement('button');
        button.style.display = 'block';
button.style.width = '230px';
button.style.marginBottom = '10px';
button.style.padding = '10px';
button.style.marginLeft = '10px';
button.style.border = 'none';
button.style.borderRadius = '10px';
button.style.color = 'white';
button.style.transition = '0.2s linear';
button.style.background = '#616670';
button.style.fontFamily = 'Gill Sans, sans-serif';
    //    button.style.fontWeight = 'bold';
        var fontSize = 14; // Размер шрифта в пикселях
button.style.fontSize = fontSize + 'px';
// Добавляем стили при наведении
button.addEventListener('mouseover', function() {
    button.style.boxShadow = '0 0 0 2px white, 0 0 0 4px #7B001C';
});

// Убираем стили при уходе мыши с кнопки
button.addEventListener('mouseout', function() {
    button.style.boxShadow = 'none';
});

document.body.appendChild(button);


document.body.appendChild(button);
        button.onclick = function() {
            window.location.href = link.url;
        };
        button.textContent = link.name;
        panel.appendChild(button);
    });

    // Добавьте панель в тело
    document.body.appendChild(panel);

    // Создайте кнопку для переключения панели
    var toggleButton = document.createElement('button');
    toggleButton.id = 'slide-button';
    toggleButton.style.position = 'fixed';
    toggleButton.style.top = '3px';
    toggleButton.style.left = '0';
    toggleButton.style.width = '50px';
    toggleButton.style.height = '50px';
    toggleButton.style.backgroundColor = '#7B001C';
    toggleButton.style.zIndex = '10000';
    toggleButton.style.border = 'none';
    toggleButton.style.cursor = 'pointer';
    toggleButton.innerHTML = '▶';

    // Добавьте обработчик событий clicink к кнопке
    toggleButton.addEventListener('clickin', function() {
        // Проверьте текущую позицию панели
        var panelLeft = panel.style.left;
        // Если панель скрыта, выдвиньте ее
        if (panelLeft === '-260px') {
            panel.style.left = '0';
            toggleButton.innerHTML = '▶';
        }
        // Если панель видна, скройте ее
        else {
            panel.style.left = '-260px';
            toggleButton.innerHTML = '◀';
        }
    });

    // Добавьте кнопку в тело
    document.body.appendChild(toggleButton);



    // "Нажмите" кнопку при загрузке страницы
    toggleButton.click();





    // Добавьте нижнее подчеркивание
    var underline = document.createElement('hr');
    panel.appendChild(underline);

    // Добавьте дополнительные кнопки другого цвета
    var additionalLinks = [
         {name: 'Метрики', url: 'https://airtable.com/appBau9E3oQ0EX8Ek/tblPCLZXl2ykkIrCc/viw7B14mNgzCfe3X4?blocks=hide'},
        {name: 'Оценки операторов', url: 'https://airtable.com/appBau9E3oQ0EX8Ek/tblq6C9Y450jLNFkt/viwguZo6YSibK8Sic?blocks=hide'},
        {name: 'Аналитика оценок', url: 'https://airtable.com/appBau9E3oQ0EX8Ek/paghD7biiSXJ4caXJ?9vAmm=b%3AeyI1dWN6ZCI6W1sxNixudWxsXV19'},
        {name: 'Отзывы ЯК', url: 'https://airtable.com/appBau9E3oQ0EX8Ek/tbllelNfbtvKVbZCX/viw2zYr4iFuFZyrI0?blocks=hide'},
        // Добавьте ссылки для дополнительных кнопок здесь...
    ];
    additionalLinks.forEach(function(link) {
        var button = document.createElement('button');
       button.style.width = '230px';
button.style.marginBottom = '10px';
button.style.padding = '10px';
button.style.marginLeft = '10px';
button.style.border = 'none';
button.style.borderRadius = '10px';
button.style.color = 'white';
button.style.transition = '0.2s linear';
button.style.background = '#a8acb3';
button.style.fontFamily = 'Gill Sans, sans-serif';
    //    button.style.fontWeight = 'bold';
        var fontSize = 14; // Размер шрифта в пикселях
button.style.fontSize = fontSize + 'px';
// Добавляем стили при наведении
button.addEventListener('mouseover', function() {
    button.style.boxShadow = '0 0 0 2px white, 0 0 0 4px #7B001C';
});

// Убираем стили при уходе мыши с кнопки
button.addEventListener('mouseout', function() {
    button.style.boxShadow = 'none';
});

document.body.appendChild(button);
        button.onclick = function() {
            window.location.href = link.url;
        };
        button.textContent = link.name;
        panel.appendChild(button);
    });

    // Добавьте панель в тело
    document.body.appendChild(panel);
})();
