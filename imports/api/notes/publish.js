import { Meteor } from 'meteor/meteor';
import { Notes } from './collection';

if (Meteor.isServer) {
  Meteor.publish('notes', function tasksPublication() {
    return Notes.find();
  });
}
