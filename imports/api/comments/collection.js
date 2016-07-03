import { Mongo } from 'meteor/mongo';

export const Comments = new Mongo.Collection('comments');

//Attributes: text, creater, createdAt, event_Id, category

Comments.allow({
  insert(userId, comment) {
    return userId && comment.creater === userId;
  }
});
