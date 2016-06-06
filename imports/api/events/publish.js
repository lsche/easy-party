import { Meteor } from 'meteor/meteor';
import { Events } from './collection';

if (Meteor.isServer) {
  Meteor.startup(function() {

    return Meteor.methods({

      removeAllEvents: function() {

        return Events.remove({});

      }

    });

  });
  Meteor.publish('events', function tasksPublication() {
    return Events.find();
  });
}
