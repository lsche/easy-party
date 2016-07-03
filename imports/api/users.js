import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
  Meteor.startup(function() {

    return Meteor.methods({

      removeAllUsers: function() {

        return Meteor.users.remove({});

      }

    });

  });
  Meteor.publish('users', function() {
    return Meteor.users.find({}, {
      fields: {
        emails: 1,
        profile: 1
      }
    });
  });
}

Meteor.users.allow({
  update(userId) {
    return userId;
  }
});