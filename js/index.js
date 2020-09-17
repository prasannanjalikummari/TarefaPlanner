const taskM = new TaskManager();   //taskM is an instance of taskManager

//Form
const form = document.querySelector('#form');

//Inputs
const inputName = document.querySelector('#nameFormControlInput');
const inputDescription = document.querySelector('#descriptionFormControlTextArea');
const inputAssignTo = document.querySelector('#emailFormControlInput');
const inputDueDate = document.querySelector("#duedate");

//Clear Validation
const formControls = form.querySelectorAll('.form-control');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    validateTaskForm();

    const name = inputName.value;
    const description = inputDescription.value;
    const assignedTo = inputAssignTo.value;
    const dueDate = inputDueDate.value;

    taskM.addTask(name, description, assignedTo, dueDate);
    taskM.render();

    inputName.value = '';
    inputDescription.value = '';
    inputAssignTo.value = '';
    inputDueDate.value = '';
});

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
    if (inputAssignTo.value.length < 8 || inputAssignTo.value === "") {
        inputAssignTo.classList.add('is-invalid');
    } else {
        inputAssignTo.classList.add('is-valid');
    }

    //Date
    // const currentDate = new Date();
    // const inputDate = inputDueDate.value;  /** in the form of 2020-9-11 */
    // let partOfInputDate = inputDate.split("-");
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

const taskList = document.querySelector('#tasksList');
// taskList.addEventListener('click',(event) => {
// if (event.target.classList.contains('done-button')){

// }
// });






