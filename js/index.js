const taskM = new TaskManager(); 
taskM.load();
taskM.render();

//Form
const form = document.querySelector("#form");

//Inputs
const inputName = document.querySelector("#nameFormControlInput");
const inputDescription = document.querySelector(
  "#descriptionFormControlTextArea"
);
const inputAssignTo = document.querySelector("#emailFormControlInput");
const inputDueDate = document.querySelector("#duedate");

//Clear Validation
const formControls = form.querySelectorAll(".form-control");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  validateTaskForm();

  const name = inputName.value;
  const description = inputDescription.value;
  const assignedTo = inputAssignTo.value;
  const dueDate = inputDueDate.value;

  taskM.addTask(name, description, assignedTo, dueDate);

  taskM.save();
  taskM.render();

  inputName.value = "";
  inputDescription.value = "";
  inputAssignTo.value = "";
  inputDueDate.value = "";

  // close the modal by toggling
  $("#addNew").modal("toggle");
});


formControls.forEach((control) => {
  control.addEventListener("focus", (event) => {
    clearValidation(control);
  });
});

//Functions

function validateTaskForm() {
  //Name
  if (inputName.value.length > 8 || inputName.value === "") {
    inputName.classList.add("is-invalid");
  } else {
    inputName.classList.add("is-valid");
  }

  //Description
  if (inputDescription.value.length < 15 || inputDescription.value === "") {
    inputDescription.classList.add("is-invalid");
  } else {
    inputDescription.classList.add("is-valid");
  }

  //AssignedTo
  if (inputAssignTo.value.length < 8 || inputAssignTo.value === "") {
    inputAssignTo.classList.add("is-invalid");
  } else {
    inputAssignTo.classList.add("is-valid");
  }

  //Date validation is deferred
  
}

function clearValidation(control) {
  control.classList.remove("is-invalid");
  control.classList.remove("is-valid");
}

//Buttons

const taskList = document.querySelector("#tasksList");
taskList.addEventListener("click", (event) => {
  if (event.target.classList.contains("done-button")) {
    const parentTask = event.target.parentElement.parentElement.parentElement;  
    const taskId = Number(parentTask.dataset.taskId);
    const task = taskM.getTaskById(taskId);
    task.status = 'DONE';
    taskM.save();
    taskM.render();
  }
  if (event.target.classList.contains("delete-button")) {
    const parentTask = event.target.parentElement.parentElement.parentElement;
    const taskId = Number(parentTask.dataset.taskId);
    taskM.deleteTask(taskId);
    taskM.save();
    taskM.render();
  }
});


