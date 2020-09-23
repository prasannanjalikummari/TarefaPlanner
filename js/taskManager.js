const createTaskHtml = (name, description, assignedTo, dueDate, status, id) => {
  return `
        <div class="col-md-12 col-lg-4">
            <div class="card" data-task-id=${id}>
                <div class="text-center border-info">
                    <div class="card-header ${status === 'TODO' ? 'bg-warning' : 'bg-success'}">
                        <span class="text-white">${status}</span>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title display-4">${name}</h5>
                        <p class="card-text mt-2">${description}</p>
                        <p class="card-text mt-5">
                            <i class="fa fa-calendar" aria-hidden="true"></i>
                            ${dueDate}
                        </p>
                        <a href="#" class="btn btn-primary">
                            <i class="fa fa-file-text-o" aria-hidden="true"></i>
                        </a>
                        <button type="button" class="btn btn-danger delete-button">
                            <i class="fa fa-trash-o" aria-hidden="true"></i>
                        </button></br></br>
                        <a href="#" class="btn btn-info done-button ${status === 'TODO' ? 'visible' : 'invisible'}" role ="button">Mark as Done
                        <i class="fa fa-check" aria-hidden="true"></i>
                        </a>
                    </div>
                    <div class="card-footer text-muted">
                        ${assignedTo}
                    </div>
                </div>
            </div>
        </div>
   `;
};

class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }

  addTask(name, description, assignedTo, dueDate) {
    const task = {
      id: this.currentId++,
      name: name,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,
      status: "TODO",
    };

    this.tasks.push(task);
  }

  render() {
    const taskHtmlList = [];

    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      const date = new Date(task.dueDate);
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

      const taskHTML = createTaskHtml(
        task.name,
        task.description,
        task.assignedTo,
        formattedDate,
        task.status,
        task.id
      );

      taskHtmlList.push(taskHTML);
    }

    const tasksHtml = taskHtmlList.join("\n");
    const card = document.querySelector("#tasksList");
    card.innerHTML = tasksHtml;
  }

  getTaskById(taskId) {
    let foundTask;
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      if (task.id === taskId) {
        foundTask = task;
      }
    }
    return foundTask;
  }

  save() {
    const tasksJson = JSON.stringify(this.tasks);
    localStorage.setItem('tasks', tasksJson);
    const currentId = String(this.currentId);
    localStorage.setItem('currentId', currentId);
  }

  load() {
    if (localStorage.getItem('tasks')) {
      const tasksJson = localStorage.getItem('tasks');
      this.tasks = JSON.parse(tasksJson);
    }

    if (localStorage.getItem('currentId')) {
      const currentId = localStorage.getItem('currentId');
      this.currentId = Number(currentId);
    }

  }

  deleteTask(taskId) {
    const newTasks = [];

    for(let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      if(task.id !== taskId) {
        newTasks.push(task);
      }
    }

    this.tasks = newTasks;
  }

}
