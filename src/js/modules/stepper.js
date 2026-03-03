export const step = () => {

    const steppers = document.querySelectorAll('.quantity-item');

    steppers.forEach(stepper => {

        const stepperValue = stepper.querySelector('.quantity-item__value');
        const stepperBtnUp = stepper.querySelector('.quantity-item__btn-up');
        const stepperBtnDown = stepper.querySelector('.quantity-item__btn-down');


        let count = stepperValue.value;


        if (count == 0) {
            stepperBtnDown.setAttribute("disabled", '');
        }

        stepperBtnUp.addEventListener('click', (e) => {
            e.preventDefault();
            count = stepperValue.value;
            count++;
            if (count == 0) {
                stepperBtnDown.setAttribute("disabled", '');
            } else {
                stepperBtnDown.removeAttribute("disabled");
            }

            if (count >= 99) {
                stepperBtnUp.setAttribute("disabled", '');
            }
            stepperValue.value = count;
            stepperValue.setAttribute("value", count);
        });

        stepperBtnDown.addEventListener('click', (e) => {
            e.preventDefault();
            count = stepperValue.value;
            count--;
            if (count <= 0) {
                stepperBtnDown.setAttribute("disabled", '');
            } else {
                stepperBtnDown.removeAttribute("disabled");
            }

            if (count < 99) {
                stepperBtnUp.removeAttribute("disabled");
            }

            stepperValue.value = count;
            stepperValue.setAttribute("value", count);
        });
    })

}

