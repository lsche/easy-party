import { Meteor } from 'meteor/meteor';
import 'meteor/mrgalaxy:stripe';

if (Meteor.isServer) {
    var stripe = StripeAPI(Meteor.settings.StripePri);
    
    Meteor.methods({
       'chargeCard': function(cardToken) {
           stripe.charges.create({
               amount: 499,
               currency: 'eur',
               source: cardToken
           }, function(err, result) {
               if (err) {
                   throw new Meteor.error(500, 'stripe-error', err.message);    
               } else {
                   console.log(result);
                   return result;
               }
               
           })
       } 
    });
}