import { Mongo } from 'meteor/mongo';

export const Todos = new Mongo.Collection('todos');

Todos.allow({
  insert(userId, todo) {
    return userId && todo.creater === userId;
  },
  update() {
    return true;
  }

});
