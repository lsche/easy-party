import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import moment from 'moment';

import { Meteor } from 'meteor/meteor';
import template from './providersSearch.html';
import { Providers } from '../../../api/providers';
import { Events } from '../../../api/events';
import { Notes } from '../../../api/notes';
import { name as PartyImage } from '../partyImage/partyImage';


class ProvidersSearch {
  constructor($stateParams, $scope, $reactive) {
    'ngInject';
    'mdDateTime';
    
    $reactive(this).attach($scope);

        this.sort = '';
        this.searchText = '';
        this.note = {};
        
        this.typeFilter = ["Drink & Dance (Party)","Birthday(-Dinner)","Wedding Venue","Conference/Seminar"];
        this.typeSelected = [];
        Session.set('FilterType', this.typeSelected);

        this.priceFilter = ["1", "2", "3", "4", "5"];
        this.priceSelected = [];
        Session.set('FilterPrice', this.priceSelected);

        this.guestsFilter = ["10", "20", "30"];
        this.guestsSelected = [];
        Session.set('FilterGuests', this.guestsSelected);

        this.toggle = function (item, list) {
            
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            }
            else {
                list.push(item);
            }
        };

        this.exists = function (item, list) {
            return list.indexOf(item) > -1;
        };

        this.subscribe('notes');
        this.subscribe('events');
        this.subscribe('providers', () => [Session.get('FilterType'), Session.get('FilterPrice'), Session.get('FilterGuests'), Session.get('FilterSearch') ]);


        $scope.getCap = function(cap){
            if (cap == 10) { return "< 10" }
            if (cap == 20) { return "10 - 30" }
            if (cap == 30) { return "> 30" }
        };

        $scope.getPrice = function(price){
            if (price == 1) { return "€" }
            if (price == 2) { return "€€" }
            if (price == 3) { return "€€€" }
            if (price == 4) { return "€€€€" }
            if (price == 5) { return "€€€€€" }
        };

        this.subscribe('users');
        this.subscribe('images');

    //this.eventId = $stateParams.eventId;
    this.helpers({
        providerslist() {
                switch(this.getReactively('sort')) {
                  case 'Name':
                    return Providers.find({ category: this.myAttr },{sort: {name: 1}});
                    break;
                  case 'Price':
                    return Providers.find({ category: this.myAttr },{sort: {price: 1}});
                    break;
                  case 'Guests':
                    return Providers.find({ category: this.myAttr },{sort: {capacity: 1}});
                    break;
                  default:
                    return Providers.find({ category: this.myAttr });
                }
            },
        isLoggedIn() {
            return !!Meteor.userId();
        },
        currentUser() {
            return Meteor.user();
        },
        eventList(){
            var currentUserMail = Meteor.user();
            var currentId = Meteor.userId();
            if(currentUserMail){
                var mail = currentUserMail.emails[0].address;
                return Events.find( { $or: [ {creator: currentId}, {planner: {$elemMatch: {mail: mail}}} ] } );
            } else {
                return null;
            }
        }
    });
  }

  submit() {
        console.log("FilterType: " + this.getReactively('typeSelected'));
        console.log("FilterPrice: " + this.getReactively('priceSelected'));
        console.log("FilterGuests: " + this.getReactively('guestsSelected'));

        Session.set('FilterType',this.getReactively('typeSelected'));
        Session.set('FilterPrice',this.getReactively('priceSelected'));
        Session.set('FilterGuests',this.getReactively('guestsSelected'));
        Session.set('FilterSearch',this.getReactively('searchText'));
        
  }

    saveAsNote(event,provider){
        this.note.creater = Meteor.user()._id;
        this.note.createdAt = new Date();
        this.note.event_Id = event._id;
        this.note.category = this.myAttr;
        this.note.name = provider.name;

        if(provider.about.length > 150){
            var shortAbout = provider.about.substring(0, 149) + " (...)";
            var customAbout = shortAbout +
                    " - Contact Details: " + provider.street +", " + provider.zip + " " + provider.city +
                ", Tel: " + provider.phone + ", Email: " + provider.email;
        } else {
            var customAbout = provider.about +
                " - Contact Details: " + provider.street +", " + provider.zip + " " + provider.city +
                ", Tel: " + provider.phone + ", Email: " + provider.email;
        }
        this.note.description = customAbout;
        Notes.insert(this.note);
    }


}

const name = 'providersSearch';

// create a module
export default angular.module(name, [
  angularMeteor,
  ngMaterial,
  PartyImage
]).component(name, {
  template,
  bindings: {
    myAttr: '='
  },
  controllerAs: name,
  controller: ProvidersSearch
});
