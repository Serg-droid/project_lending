document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    const makeRequest = () => {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', './cars.json');
            request.setRequestHeader('Content-type', 'application/json');
            request.send();

            request.addEventListener('readystatechange', () => {
                if (request.readyState === 4 && request.status === 200) {
                    resolve(request.responseText);
                }else if(request.readyState === 4){
                    reject('Произошла ошибочка');
                }
            });
        });
    };

    select.addEventListener('change', () => {
        makeRequest()
            .then(responseText => {
                const data = JSON.parse(responseText);
                data.cars.forEach(item => {
                    if (item.brand === select.value) {
                        const {brand, model, price} = item;
                        output.innerHTML = `Тачка ${brand} ${model} <br>
                        Цена: ${price}$`;
                    }
                });
                select.value = 'no';
            })
            .catch(errorText => {
                output.innerHTML = errorText;
            });
        });
});
