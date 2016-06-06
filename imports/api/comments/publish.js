import { Meteor } from 'meteor/meteor';
import { Comments } from './collection';

if (Meteor.isServer) {
  Meteor.startup(function() {

    return Meteor.methods({

      removeAllComments: function() {

        return Comments.remove({});

      }

    });

  });
  Meteor.publish('comments', function tasksPublication() {
    return Comments.find();
  });
}
