window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // TABS

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');

        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', (e) => {
        let target = e.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });


    // TIMER

    let deadline = '2020-03-30';

    function getTimeRemaining(endTime) {
        let t = Date.parse(endTime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / 1000 / 60 / 60) % 24);

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(id, endTime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endTime);
            if (t.hours < 10) {
                hours.textContent = '0' + t.hours;
            } else {
                hours.textContent = t.hours;
            }
            if (t.minutes < 10) {
                minutes.textContent = '0' + t.minutes;
            } else {
                minutes.textContent = t.minutes;
            }
            if (t.seconds < 10) {
                seconds.textContent = '0' + t.seconds;
            } else {
                seconds.textContent = t.seconds;
            }




            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('timer', deadline);


    // MODAL WINDOW

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', () => {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', () => {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });


    // FORM AJAX

    let message = {
        loading: 'Loading...',
        success: 'Thank you, see you soon)',
        falure: 'Something went wrong...'
    };

    let form = document.querySelector('.main-form'),
        contactForm = document.getElementById('form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');
    statusMessage.classList.add('status');

    function sendForm(elem) {
        elem.addEventListener('submit', (e) => {
            e.preventDefault();
            elem.appendChild(statusMessage);

            let formData = new FormData(elem);

            let jsonObject = {};

            for (let key of formData.entries()) {
                jsonObject[key[0]] = key[1];
            }
            formData = jsonObject;

            function postData(data) {
                return new Promise((resolve, reject) => {
                    let request = new XMLHttpRequest();

                    request.open('POST', 'server.php');

                    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

                    request.onreadystatechange = () => {
                        if (request.readyState < 4) {
                            resolve();
                        } else if (request.readyState === 4 && request.status == 200) {
                            resolve();
                        } else {
                            reject();
                        }
                    };

                    request.send(JSON.stringify(data));
                });
            } //end postData

            function clearInput() {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
            }

            postData(formData)
                .then(() => {
                    statusMessage.textContent = message.loading;
                })
                .then(() => {
                    statusMessage.textContent = message.success;
                })
                .catch(() => {
                    statusMessage.textContent = message.falure;
                })
                .then(clearInput);

        }); //end submit

    } //end sendForm 
    sendForm(form);
    sendForm(contactForm);

    // SLIDER

    let sliderIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    function showSlides(n) {
        if (n > slides.length) {
            sliderIndex = 1;
        }
        if (n < 1) {
            sliderIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[sliderIndex - 1].style.display = 'block';
        dots[sliderIndex - 1].classList.add('dot-active');
    }
    showSlides(sliderIndex);

    setInterval(() => {
        plusSlides(1);
    }, 4000);

    function plusSlides(n) {
        showSlides(sliderIndex += n);
    }

    function currentSlide(n) {
        showSlides(sliderIndex = n);
    }

    prev.onclick = () => {
        plusSlides(-1);
    };

    next.onclick = () => {
        plusSlides(1);
    };

    dotsWrap.onclick = (e) => {
        for (let i = 0; i < dots.length + 1; i++) {
            if (e.target.classList.contains('dot') && e.target == dots[i - 1]) {
                currentSlide(i);
            }
        }
    };

    // CALCULATOR

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.textContent = 0;

    persons.oninput = function () {
        personsSum = +this.value;
        total = (daysSum + personsSum) * 4000;

        if (persons.value == '' || restDays.value == '') {
            totalValue.textContent = 0;
        } else {
            totalValue.textContent = total;
        }
    };

    restDays.oninput = function () {
        daysSum = +this.value;
        total = (daysSum + personsSum) * 4000;

        if (persons.value == '' || restDays.value == '') {
            totalValue.textContent = 0;
        } else {
            totalValue.textContent = total;
        }
    };

    place.onchange = function () {
        if (persons.value == '' || restDays.value == '') {
            totalValue.textContent = 0;
        } else {
            let t = total;
            totalValue.textContent = t * this.options[this.selectedIndex].value;
        }
    };

});