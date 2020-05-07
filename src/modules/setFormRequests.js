import makeRequest from './makeRequest';

function setFormRequests() {
    const allForms = document.querySelectorAll('form');

    const requestHandler = (form, stateToWrite) => {
        const state = {
            load: 'Подождите, пожалуйста, идет загрузка',
            get: 'Данные отправлены',
            error: `Произошла ошибка`,
        }
        const formLastChild = form.children[form.children.length - 1];
        if (formLastChild.matches('.load-div, .error-div, .get-div')) {
            formLastChild.remove();
        }
        const answerDiv = document.createElement('div');
        if (stateToWrite === 'load') {
            answerDiv.classList.add('sk-double-bounce');
            answerDiv.innerHTML = `
            <div class='sk-child sk-double-bounce-1'></div>
            <div class='sk-child sk-double-bounce-2'></div>
            `;
        } else {
            answerDiv.style.cssText = 'font-size: 30px; background-color: #fff; color: #000; display: inline-block';
            answerDiv.textContent = state[stateToWrite];
        }
        answerDiv.classList.add(`${stateToWrite}-div`);
        form.appendChild(answerDiv);
        if (stateToWrite === 'get' || stateToWrite === 'error') {
            setTimeout(() => {
                answerDiv.remove();
            }, 5000);
        }
    }

    allForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            requestHandler(form, 'load');
            const dataObj = {}; 
            formData.forEach((value, key) => dataObj[key] = value);
            makeRequest('../server.php', 'POST', JSON.stringify(dataObj))
                .then((response) => {
                    if(response.status !== 200){
                        throw new Error('response status not 200');
                    }
                    requestHandler(form, 'get');
                })
                .catch((error) => requestHandler(form, 'error'));
            const formInputs = form.querySelectorAll('input');
            formInputs.forEach(input => {
                input.value = '';
            });
        });
    })

    //добваляем стили для прелоадер-картинки
    const style = document.createElement('style');
    style.textContent = `
    .sk-double-bounce {
        width: 4em !important;
        height: 4em !important;
        position: relative;
        margin: auto;
        z-index: 100;
    }
      
    .sk-child {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color:  #337ab7 !important;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 0;
        animation: sk-double-bounce 2.0s infinite ease-in-out;
    }
      
    .sk-double-bounce-2 {
    animation-delay: -1.0s;
    }
      
    @keyframes sk-double-bounce {
        0%, 100% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.0);
        }
    }
    `;
    document.head.append(style);
}

export default setFormRequests;