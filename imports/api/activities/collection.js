import { Mongo } from 'meteor/mongo';

export const Activities = new Mongo.Collection('activities');

Activities.allow({
  insert(activity) {
    return true;
  }
});
