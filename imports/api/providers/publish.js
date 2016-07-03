import { Meteor } from 'meteor/meteor';
import { Providers } from './collection';

// if (Meteor.isServer) {
//   Meteor.publish('providers', function tasksPublication() {
//     return Providers.find();
//   });
// }

if (Meteor.isServer) {
  Meteor.publish('providers', function(whichType, whichPrice, whichCapacity, searchString) {
    const selector = {};

    if (typeof searchString === 'string' && searchString.length) {
      selector.tags = {
        $regex: `.*${searchString}.*`,
        $options : 'i'
      };
    }

      if(whichType.length > 0) {
        selector.type = {
          $in: whichType
        }
      }
      

      if(whichPrice.length > 0) {
        selector.price = {
          $in: whichPrice
        }
      }

      if(whichCapacity.length > 0) {
        selector.capacity = {
          $in: whichCapacity
        }
      }


    return Providers.find(selector);
  });
}