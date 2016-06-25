import { Meteor } from 'meteor/meteor';
import { Activities } from './collection';

if (Meteor.isServer) {
  Meteor.startup(function() {

    return Meteor.methods({

      removeAllActivities: function() {

        return Activities.remove({});

      }

    });

  });
  Meteor.publish('activities', function tasksPublication() {
    return Activities.find();
  });
}
