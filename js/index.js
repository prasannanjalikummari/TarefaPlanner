(() => {

    /*___________Form Validation______________ */

    const form = document.querySelector('#form');
    const inputName = document.querySelector('#nameFormControlInput');
    const inputDescription = document.querySelector('#descriptionFormControlTextArea');
    const inputAssignTo = document.querySelector('#emailFormControlInput');
    const formControls = form.querySelectorAll('.form-control');

    form.addEventListener('submit', (event) => {
        validateTaskForm();
        event.preventDefault();
    })

    formControls.forEach((control) => {
        control.addEventListener('focus', (event) => {
            clearValidation(control);
        });
    });

    
    //Functions

    function validateTaskForm() {

        //Name
        if (inputName.value.length > 8 || inputName.value === "") {
            inputName.classList.add('is-invalid');
        } else {
            inputName.classList.add('is-valid');
        }

        //Description
        if (inputDescription.value.length < 15 || inputDescription.value === "") {
            inputDescription.classList.add('is-invalid');
        } else {
            inputDescription.classList.add('is-valid');
        }

        //AssignedTo
        if (inputAssignTo.value.length > 8 || inputAssignTo.value === "") {
            inputAssignTo.classList.add('is-invalid');
        } else {
            inputAssignTo.classList.add('is-valid');
        }

    }

    function clearValidation(control) {
        control.classList.remove('is-invalid');
        control.classList.remove('is-valid');
    }
    
})();






