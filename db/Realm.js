import Realm from 'realm';

const TaskSchema = {
  name: 'Task',
  properties: {
    _id: 'int',
    title: 'string',
    description: 'string',
    createdAt: 'string',
  },
  primaryKey: '_id',
};

const r = new Realm({schema: [TaskSchema]});

export const getTasks = () => {
  return r.objects('Task');
};

export const addTask = task => {
  r.write(() => {
    r.create('Task', {
      _id: Date.now(),
      title: task.title,
      description: task.description,
      createdAt: new Date().toLocaleDateString('pt-BR'),
    });
  });
};

export const deleteTask = id => {
  r.write(() => {
    r.delete(r.objects('Task').filter(task => task._id === id));
  });
};

export const updateTask = (id, values) => {
  r.write(() => {
    r.objects('Task').map(task => {
      if (task.id === id) {
        console.log(task.id);
        console.log(id);
        task._id = id;
        task.title = values.title;
        task.description = values.description;
        task.createdAt = values.createdAt;
      }
    });
  });
};
