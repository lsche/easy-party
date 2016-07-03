import { Meteor } from 'meteor/meteor';
import { Buffet } from './collection';

if (Meteor.isServer) {
  Meteor.startup(function() {

    return Meteor.methods({

      removeAllBuffet: function() {

        return Buffet.remove({});

      }

    });

  });
  Meteor.publish('buffet', function tasksPublication() {
    return Buffet.find();
  });
}
