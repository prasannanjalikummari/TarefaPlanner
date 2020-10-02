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

    describe('#load', () => {
        describe('when tasks are saved in localStorage', () => {
            it('should set the tasks array to the saved tasks', () => {
                const taskManager = new TaskManager();

                const task = {
                    id: taskManager.currentId,
                    name: 'name',
                    description: 'description',
                    assignedTo: 'assignedTo',
                    dueDate: Date.now(),
                    status: 'TODO'
                };

                //create a tasks array
                const tasks = [task];

                //create JSON og the tasks array
                const tasksJson = JSON.stringify(tasks);

                //spy on localStorage.getItm() and return the taskJson
                spyOn(localStorage, 'getItem').and.returnValue(tasksJson);

                //call load
                taskManager.load();

                expect(taskManager.tasks).toEqual(tasks);
            });
        });

        describe('when the currentId is saved in localStorage', () => {
            it('should set the currentId to the saved currentId', () => {
                const taskManager = new TaskManager();

                //spy on localStorage.getItem() and return a currentId as a string
                spyOn(localStorage, 'getItem').and.returnValue(1);

                //call load

            taskManager.load();

            expect(taskManager.currentId).toBe(1);
            });
        });
    });

    describe('#save', () => {
        describe('when tasks exist in the task manager', () => {
            it('should store the tasks in local storage', () => {
                const taskManager = new TaskManager();

                const task = {
                    id: taskManager.currentId,
                    name: 'name',
                    description: 'description',
                    assignedTo: 'assignedTo@assignedTo.com',
                    dueDate: Date.now(),
                    status: 'TODO'
                };

                taskManager.addTask(task.name, task.description, task.assignedTo, task.dueDate);

                //create JSON of the task in an array
                const tasksJson = JSON.stringify([task]);

                //spy on the localStorage
                const localStorageSpy = spyOn(localStorage, 'setItem');

                //call save
                taskManager.save();

                //check ig localStorage was called first with the tasks key and the json
                expect(localStorageSpy.calls.first().args).toEqual(['tasks', tasksJson]);

            });

            it('should store the currentId in local storage', () => {
                const taskManager = new TaskManager();

                taskManager.addTask('name', 'description', 'assignedTo@assignedTo.com', Date.now());

                //spy on the localStorage
                const localStorageSpy = spyOn(localStorage, 'setItem');

                //call save
                taskManager.save();

                //create string of the currentId
                const currentId = String(taskManager.currentId);

                //check if localStorage was called last with the currentId key and the currentId
                expect(localStorageSpy.calls.mostRecent().args).toEqual(['currentId', currentId]);
            });
        });
    });

    describe('#render', () => {
        describe('when tasks exist in the task manager', () => {
            it('should render the test in the innerHTML of the taskList', () => {
                const taskManager = new TaskManager();

                const task = {
                    id: taskManager.currentId,
                    name: 'name',
                    description: 'description',
                    assignedTo: 'assignedTo@assignedTo.com',
                    dueDate: 1601613130450, //specific date to make it easier to check html (I used Date.now() in the console to find this number)
                    status: 'TODO'
                };

                taskManager.addTask(task.name, task.description, task.assignedTo, task.dueDate);

                const tasksList = { innerHTML: '' };

                //spy on querySelector so we can check the tasklist innerHTML later
                spyOn(document, 'querySelector').and.returnValue(tasksList);

                taskManager.render();

                //test taskList html has rendered correctly
                expect(tasksList.innerHTML).toContain('<div class="card" data-task-id=0>');
                expect(tasksList.innerHTML).toContain('<span class="text-white">TODO</span>');
                expect(tasksList.innerHTML).toContain('<h5 class="card-title display-4">name</h5>');
                expect(tasksList.innerHTML).toContain('<p class="card-text mt-2">description</p>');
                expect(tasksList.innerHTML).toContain('<div class="card-footer text-muted">assignedTo@assignedTo.com</div>');
                expect(tasksList.innerHTML).toContain('<p class="card-text mt-5"><i class="fa fa-calendar" aria-hidden="true"></i>2/10/2020</p>');
                //Don't know how to test date
            });
        });
    });
});