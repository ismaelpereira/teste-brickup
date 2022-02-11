import {observable, action, makeObservable} from 'mobx';
import {getTasks, addTask, deleteTask, updateTask} from './Realm';

class TaskStore {
  tasks = getTasks();

  updateList() {
    this.tasks = getTasks();
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
    addTask(task);
    this.updateList();
  }

  deleteTask(id) {
    deleteTask(id);
    this.updateList();
  }

  updateTask(item) {
    updateTask(item);
    this.updateList();
  }
}

export const taskStore = new TaskStore();
