import { Mongo } from 'meteor/mongo';

export const Dishes = new Mongo.Collection('dishes');

// Attributes for dishes: ID, name, cook, description

Dishes.allow({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove(userId){
    return userId;
  }
});
