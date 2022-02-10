import Realm from 'realm';

class Tasks extends Realm.Object {}

Tasks.schema = {
  name: 'Tasks',
  properties: {
    _id: 'objectId',
    title: 'string',
    text: 'string',
  },
};

const realm = new Realm({schema: [Tasks]});

function getTasks() {
  return realm.objects('Tasks').sorted('createdAt');
}

function addTask(_title, _text) {
  try {
    realm.write(() => {
      const task = realm.create('Tasks', {
        _id,
        title: _title,
        description: _text,
      });
    });
  } catch (err) {
    throw new Error(`Erro ao adicionar Task ${Error.arguments}`);
  }
}

function deleteTask(_id) {
  let task = getTasks().filtered(_id);
  realm.delete(task);
}

function updateTask(_id, _title, _text) {
  let task = getTasks().filtered(_id);
  realm.write(() => {
    (task._id = _id), (task._title = _title), (task._text = _text);
  });
}

export default realm;

export {getTasks, addTask, deleteTask, updateTask};
