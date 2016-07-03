import { Mongo } from 'meteor/mongo';

export const Notes = new Mongo.Collection('notes');

//Attributes: creater, createdAt, event_Id, category, name, description
Notes.allow({
  insert(userId, note) {
    return userId && note.creater === userId;
  },
  remove(userId){
    return userId;
  }
});
