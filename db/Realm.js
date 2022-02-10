import Realm from 'realm';

class TaskSchema extends Realm.Object {}

TaskSchema.schema = {
  name: 'Task',
  properties: {
    _id: 'objectId',
    title: 'string',
    description: 'string',
    createdAt: 'date',
  },
  primaryKey: '_id',
};

export default new Realm({schema: [TaskSchema]});
