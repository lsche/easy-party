import { Meteor } from 'meteor/meteor';
import { Todos } from './collection';

if (Meteor.isServer) {
  Meteor.startup(function() {

    return Meteor.methods({

      removeAllTodos: function() {

        return Todos.remove({});

      }

    });

  });
  Meteor.publish('todos', function tasksPublication() {
    return Todos.find();
  });
}
