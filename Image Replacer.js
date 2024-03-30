// ==UserScript==
// @name         Image Replacer
// @namespace    https://your-namespace-here
// @version      1.0
// @description  Replace image links with images by class name
// @match        https://forms.yandex.ru/cloud/admin/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var className = "yc-link yc-link_view_secondary";
    var delay = 2000;

    function replaceLinks() {
        var links = document.getElementsByClassName(className);

        for (var i = 1; i < links.length; ) {
            var link = links[i];
            var url = link.href;
            var img = document.createElement("img");

            img.src = url;
            img.width = 300;
            img.style.height = '30%';
            img.alt ='ТУТ ЕСТЬ ВИДЕО !!!\n\n\nНАЖМИТЕ НА ССЫЛКУ СПРАВА ➡️';
            img.style.background = 'red';
            img.style.color = 'white';

            img.addEventListener('error', function() {
                var video = document.createElement("video");

                video.src = this.src;
                video.width = 300;
                video.height = 400;
                video.controls = true;

                this.parentNode.replaceChild(video, this);
            });

            var newLink = document.createElement("a");
            newLink.href = url;
 //           newLink.textContent = "Открыть видео";
            newLink.target = "_blank";

            var span = document.createElement("span");
            span.appendChild(img);
            span.appendChild(newLink);

            newLink.addEventListener("click", function(event) {
                event.preventDefault();

                var url = event.target.href;
                var video = document.createElement("video");

                video.src = url;
                video.width = 300;
                video.height = 400;
                video.controls = true;

                event.target.parentNode.appendChild(video);
                video.play();
            });

            link.parentNode.replaceChild(span, link);
        }
    }

    setTimeout(replaceLinks, delay);

    setTimeout(function() {
        var element = document.getElementsByClassName('AdminLayout-Footer')[0];
        if (element) {
            element.parentNode.removeChild(element);
        }
    });

})();
