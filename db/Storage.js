import Realm from './Realm';
import {observable, action, makeObservable} from 'mobx';

class TaskStorage {
  constructor() {
    makeObservable(this, {
      tasks: observable,
      addTask: action,
      deleteTask: action,
      updateTask: action,
    });
  }

  tasks = Realm.objects('Task');

  getTasks() {
    console.log(this.tasks);
    return this.tasks;
  }

  addTask(task) {
    console.log(task);
    Realm.write(() => {
      Realm.create('Task', {
        _id: new Date(),
        title: task.title,
        description: task.description,
        createdAt: new Date().toLocaleDateString('pt-BR'),
      });
    });
  }

  deleteTask() {}

  updateTask() {}
}

export const taskStore = new TaskStorage();

let tasks = taskStore.getTasks();
console.log(tasks);
