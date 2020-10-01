describe('TaskManager', () => {
    describe('#constructor', () => {
        describe('when a new TaskManager is initialized', () => {
            it('should create an empty tasks array', () => {
                const taskManager = new TaskManager();

               expect(taskManager.tasks).toEqual([]);
            });

            it('should set the currentId to the passed in number', () => {
                const taskManager = new TaskManager(1);

               expect(taskManager.currentId).toBe(1);
            });

        });
    });

    describe('#addTask', () => {
        describe('passing parameters to add a new task', () => {
            it('should add the new task to the tasks array', () => {
                const addTaskTest = new TaskManager();

                const task = {
                    id: addTaskTest.currentId,
                    name: 'name',
                    description: 'description',
                    assignedTo: 'assignedTo@assignedTo.com',
                    dueDate: new Date(),
                    status: "TODO",
                  };
              
                  addTaskTest.addTask(task.name, task.description, task.assignedTo, task.dueDate);

                  expect(addTaskTest.tasks[0]).toEqual(task);
            });

            it('should imcrement the currentId property', () => {
                const addTaskTest = new TaskManager(1);

                const task = {
                    id: addTaskTest.currentId,
                    name: 'name',
                    description: 'description',
                    assignedTo: 'assignedTo@assignedTo.com',
                    dueDate: new Date(),
                    status: "TODO",
                  };
              
                  addTaskTest.addTask(task.name, task.description, task.assignedTo, task.dueDate);

                  expect(addTaskTest.currentId).toBe(2);
            });
        });
    });

    describe('#deleteTask', () => {
        describe('when passed an existing taskId', () => {
            it('should remove the task from the tasks array', () => {
                const taskManager = new TaskManager(2);

                const task = {
                    id: taskManager.currentId,
                    name: 'name',
                    description: 'description',
                    assignedTo: 'assignedTo@assignedTo.com',
                    dueDate: new Date(),
                    status: "TODO",
                  };

                  taskManager.addTask(task.name, task.description, task.assignedTo, task.dueDate);
                  taskManager.deleteTask(task.id);

                  expect(taskManager.tasks).not.toContain(task);

            });
        })
    });

    describe('#getTaskById', () => {
        describe('when passed an existing taskId', () => {
            it('should return the task', () => {
                const taskManager = new TaskManager();

                const task = {
                    id: taskManager.currentId,
                    name: 'name',
                    description: 'description',
                    assignedTo: 'assignedTo@assignedTo.com',
                    dueDate: new Date(),
                    status: "TODO",
                  };
              
                  taskManager.addTask(task.name, task.description, task.assignedTo, task.dueDate);

                  const result = taskManager.getTaskById(task.id);

                  expect(result).toEqual(task);
            });
        });
    });
});