import { Mongo } from 'meteor/mongo';

export const Events = new Mongo.Collection('events');

Events.allow({
  insert(userId, event) {
    return userId && event.creator === userId;
  }
});
