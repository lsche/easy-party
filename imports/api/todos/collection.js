import { Mongo } from 'meteor/mongo';

export const Todos = new Mongo.Collection('todos');


//Attributes: creater, event_Id, category, done, assignee, duedate, description, name

Todos.allow({
  insert(userId, todo) {
    return userId && todo.creater === userId;
  },
  update(userId) {
    return userId;
  },
  remove(userId){
    return userId;
  }
});
