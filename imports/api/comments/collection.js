import { Mongo } from 'meteor/mongo';

export const Comments = new Mongo.Collection('comments');

Comments.allow({
  insert(userId, comment) {
    return userId && comment.creater === userId;
  }
});
