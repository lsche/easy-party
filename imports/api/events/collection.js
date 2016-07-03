import { Mongo } from 'meteor/mongo';

export const Events = new Mongo.Collection('events');

//Attributes: _id, creator, createdAt, paid, blocked, name, event_date, description, [planner]
// planner = {mail: , name: , id: }

Events.allow({
  insert(userId, event) {
    return userId && event.creator === userId;
  },
  update(userId, event){
    return userId && event.creator === userId;
  },
  remove(userId, event){
    return userId && event.creator === userId;
  }
});
