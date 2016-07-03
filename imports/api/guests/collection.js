/**
 * Created by Anna on 11.06.16.
 */
import { Mongo } from 'meteor/mongo';

//Attributes for guests: name, number, status, description

export const Guests = new Mongo.Collection('guests');

Guests.allow({
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
