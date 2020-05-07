function validateFormInputs() {
    const   allForms = document.querySelectorAll('form');

    const setInputValidation = (input) => {
        input.addEventListener('input', () => {
            const valueLastIndex = input.value.length - 1;
            if(input.type === 'tel' && valueLastIndex > -1){
                input.value = input.value.slice(0, valueLastIndex) + input.value[valueLastIndex].replace(/[^0-9\+]/, '');
            }else if((input.matches('.mess') || input.type === 'text') && valueLastIndex > -1){
                input.value = input.value.slice(0, valueLastIndex) + input.value[valueLastIndex].replace(/[^а-яё\s]/i, '');
            }
        });
    }

    allForms.forEach(form => {
        const allInputs = form.querySelectorAll('input');
        allInputs.forEach(input => {
            setInputValidation(input);
        });
    });
}

export default validateFormInputs;