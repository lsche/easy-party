import { Meteor } from 'meteor/meteor';
import { Notes } from './collection';

if (Meteor.isServer) {
  Meteor.startup(function() {

    return Meteor.methods({

      removeAllNotes: function() {

        return Notes.remove({});

      }

    });

  });
  Meteor.publish('notes', function tasksPublication() {
    return Notes.find();
  });
}
