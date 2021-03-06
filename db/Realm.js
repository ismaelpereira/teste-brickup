import Realm from 'realm';

const TaskSchema = {
  name: 'Task',
  properties: {
    _id: 'int',
    title: 'string',
    description: 'string',
    createdAt: 'string',
    uri: 'string',
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
      uri: task.uri,
    });
  });
};

export const deleteTask = id => {
  r.write(() => {
    r.delete(r.objects('Task').filter(task => task._id === id));
  });
};

export const updateTask = value => {
  const tasks = r.objects('Task');
  const updated = tasks.filtered(`_id == ${value._id}`);
  console.log(value);
  console.log('VALUE ------------------------------------');
  updated.forEach(task => {
    r.write(() => {
      task.title = value.title;
      task.description = value.description;
      task.createdAt = new Date().toLocaleDateString('pt-BR');
      task.uri = value.uri;
    });
  });
};
