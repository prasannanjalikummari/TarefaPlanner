(() => {

    /*___________Form Validation______________ */

    const form = document.querySelector('#form');
    const inputName = document.querySelector('#nameFormControlInput');
    const inputDescription = document.querySelector('#descriptionFormControlTextArea');
    const inputAssignTo = document.querySelector('#emailFormControlInput');
    const formControls = form.querySelectorAll('.form-control');
    const inputDueDate = document.querySelector("#duedate");

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

        // const currentDate = new Date();
        // const inputdate = inputDueDate.value;  /** in the form of 2020-9-11 */
        // let partOfInputDate = inputdate.split("-");
        // if (Number(partOfInputDate[0]) > currentDate.getUTCFullYear) {
        //     console.log("Future Year");
        // }
        // //console.log(part[2]);
        // if (Number(partOfInputDate[2]) >= currentDate.getUTCDate()) {
        //     console.log("valid input date");
        // }
        // else {
        //     console.log("Enter current or future date");
        // }

    }

    function clearValidation(control) {
        control.classList.remove('is-invalid');
        control.classList.remove('is-valid');
    }

})();






