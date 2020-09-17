const createTaskHtml = (name, description, assignedTo, dueDate, status) => {
  `
        <div class="col-md-12 col-lg-4">
            <div class="card">
                <div class="text-center border-info">
                    <div class="card-header">
                        ${status}
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
                        <a href="#" class="btn btn-danger">
                            <i class="fa fa-trash-o" aria-hidden="true"></i>
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
class taskManager {
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
      const formattedDate = `${date.getDate}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      const taskHTML = createTaskHtml(
        task.name,
        task.description,
        task.assignedTo,
        formattedDate,
        task.status
      );

      taskHtmlList.push(taskHTML);
    }

    const tasksHtml = taskHtmlList.join("\n");
    const card = document.querySelector("#taskslist");
    card.innerHTML = tasksHtml;
  }
}