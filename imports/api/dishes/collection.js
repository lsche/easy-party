import { Mongo } from 'meteor/mongo';

export const Dishes = new Mongo.Collection('dishes');

Dishes.allow({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove(){
    return true;
  }
});
