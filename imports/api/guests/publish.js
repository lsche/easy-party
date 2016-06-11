/**
 * Created by Anna on 11.06.16.
 */
import { Meteor } from 'meteor/meteor';
import { Guests } from './collection';

if (Meteor.isServer) {
    Meteor.startup(function() {

        return Meteor.methods({

            removeAllTodos: function() {

                return Guests.remove({});

            }

        });

    });
    Meteor.publish('guests', function tasksPublication() {
        return Guests.find();
    });
}
