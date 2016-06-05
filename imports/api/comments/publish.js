import { Meteor } from 'meteor/meteor';
import { Comments } from './collection';

if (Meteor.isServer) {
  Meteor.publish('comments', function tasksPublication() {
    return Comments.find();
  });
}
