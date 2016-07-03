import { Mongo } from 'meteor/mongo';

export const Notes = new Mongo.Collection('notes');

Notes.allow({
  insert(userId, note) {
    return userId && note.creater === userId;
  },
  remove(){
    return true;
  }
});
