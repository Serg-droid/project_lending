function validateFormInputs() {
    const   allForms = document.querySelectorAll('form');

    const setInputValidation = (input, submitBtn) => {
        input.addEventListener('input', () => {
            const valueLastIndex = input.value.length - 1;
            if(input.type === 'tel' && valueLastIndex > -1){
                input.value = input.value.slice(0, valueLastIndex) + input.value[valueLastIndex].replace(/[^0-9\+]/, '');
                if(input.value.length < 8 || input.value.length > 20){
                    submitBtn.textContent = 'Введите валидный номер';
                    submitBtn.disabled = true;
                }else{
                    submitBtn.textContent = 'Оставить заявку';
                    submitBtn.disabled = false;
                }
            }else if((input.matches('.mess') || input.type === 'text') && valueLastIndex > -1){
                input.value = input.value.slice(0, valueLastIndex) + input.value[valueLastIndex].replace(/[^а-яё\s]/i, '');
            }
        });
    }

    allForms.forEach(form => {
        const submitBtn = form.querySelector('button[type=submit]');
        const allInputs = form.querySelectorAll('input');
        allInputs.forEach(input => {
            setInputValidation(input, submitBtn);
        });
    });
}

export default validateFormInputs;