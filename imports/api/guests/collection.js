/**
 * Created by Anna on 11.06.16.
 */
import { Mongo } from 'meteor/mongo';

export const Guests = new Mongo.Collection('guests');

Guests.allow({
    insert(userId, guest) {
        return userId && guest.creater === userId;
    },
    update() {
        return true;
    },
    remove(){
        return true;
    }
});
