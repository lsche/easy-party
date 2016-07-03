import { Mongo } from 'meteor/mongo';

export const Buffet = new Mongo.Collection('buffet');

Buffet.allow({
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
