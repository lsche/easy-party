/**
 * Created by Anna on 11.06.16.
 */
import { Mongo } from 'meteor/mongo';

export const Guests = new Mongo.Collection('guests');

Guests.allow({
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
