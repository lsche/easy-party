import { Meteor } from 'meteor/meteor';
import { Dishes } from './collection';

if (Meteor.isServer) {
  Meteor.startup(function() {

    return Meteor.methods({

      removeAllDishes: function() {

        return Dishes.remove({});

      }

    });

  });
  Meteor.publish('dishes', function tasksPublication() {
    return Dishes.find();
  });
}
