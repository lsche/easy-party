import { Mongo } from 'meteor/mongo';

export const Providers = new Mongo.Collection('providers');

Providers.allow({
  insert() {
    return true;
  }
});
