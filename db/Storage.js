import {observable, action, makeObservable} from 'mobx';
import {getTasks, addTask, deleteTask, updateTask} from './Realm';

class TaskStore {
  tasks = getTasks();

  updateList() {
    this.tasks = tasks;
  }

  constructor() {
    makeObservable(this, {
      tasks: observable,
      addTask: action,
      deleteTask: action,
      updateTask: action,
      updateList: action,
    });
  }

  addTask(task) {
    addTask();
    this.updateList();
  }

  deleteTask(id) {
    deleteTask();
    this.updateList();
  }

  updateTask(item) {
    updateTask();
    this.updateList();
  }
}

export const taskStore = new TaskStore();
