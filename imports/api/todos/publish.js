import { Meteor } from 'meteor/meteor';
import { Todos } from './collection';

if (Meteor.isServer) {
  Meteor.publish('todos', function tasksPublication() {
    return Todos.find();
  });
}
