import { Mongo } from 'meteor/mongo';

export const Buffet = new Mongo.Collection('buffet');

//Attributes for buffet: ID, description, url

Buffet.allow({
  insert(userId) {
    return userId;
  },
  update(userId) {
    return userId;
  },
  remove(userId){
    return userId;
  }
});
