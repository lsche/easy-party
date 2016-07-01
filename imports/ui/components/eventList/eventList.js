// Karin - backend for content of start page

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import moment from 'moment';
import 'meteor/mrgalaxy:stripe';

import template from './eventList.html';

import { Events } from '../../../api/events';
import { Meteor } from 'meteor/meteor';




class EventList {
    constructor($scope, $reactive, $timeout, $q, $log, $state) {
        'ngInject';

        this.showAddForm = false;
        var self = this;

        $reactive(this).attach($scope);

        $scope.parseDate = function(jsonDate) {
            //date parsing functionality
            return moment(jsonDate).format('DD-MM-YYYY');
        };

        this.event = {};
        this.payment = {};
        this.event.planner = [];
        this.$state = $state;
        
        this.subscribe('events');
        this.subscribe('users');
        var handle = Meteor.subscribe('users');

        Tracker.autorun(function() {
            if (handle.ready())
                self.repos = loadAll();
        });

        this.helpers({
            creatorEvents() {
                var currentId = Meteor.userId();
                return Events.find({creator: currentId},{ sort: {createdAt: -1}});
            },
            plannerEvents(){
                var currentUserMail = Meteor.user();
                if(currentUserMail){
                    var mail = currentUserMail.emails[0].address;
                    return Events.find({planner: {$elemMatch: {mail: mail}}}, { sort: {createdAt: -1}});
                }
                return null;
            },
            timeLeft() {
                var currentUserMail = Meteor.user();
                if(currentUserMail) {
                    return moment(currentUserMail.profile.created).add(5, 'days').calendar();
                }
            },
            ifdelete() {
                var currentUserMail = Meteor.user();
                if (currentUserMail) {
                    var nowIs = Date.now();
                    var createdIs = currentUserMail.profile.created + 5 * (1000*60*60*24);

                    if ((createdIs < nowIs) && (currentUserMail.profile.paid == false)) {
                        alert('Your trial version already ended and we did not receive any payment from you. Your account will be deleted!');
                        Meteor.users.remove({_id:Meteor.userId()});
                        this.$state.go('start');
                    }
                }
            },
            ifpaid() {
                var currentUserMail = Meteor.user();
                if (currentUserMail) {
                    return currentUserMail.profile.paid;
                }
            }
        });

        self.simulateQuery = false;
        self.isDisabled    = false;
        //self.repos         = loadAll();
        self.querySearch   = querySearch;
        self.selectedItemChange = selectedItemChange;
        self.searchTextChange   = searchTextChange;
        // ******************************
        // Internal methods
        // ******************************
        /**
         * Search for repos... use $timeout to simulate
         * remote dataservice call.
         */
        function querySearch (query) {
            return query ? self.repos.filter( createFilterFor(query) ) : self.repos;
        }
        function searchTextChange(text) {
        }
        function selectedItemChange(item) {
        }
        /**
         * Build `components` list of key/value pairs
         */
        function loadAll() {
            var easyPartyUser = [];
            var users = Meteor.users.find();
            if(users){
                users.forEach(function(user) {
                    easyPartyUser.push({
                        'name': user.profile.firstName + " " +user.profile.lastName,
                        'id': user._id,
                        'mail': user.emails[0].address
                    });
                })
            }
            return easyPartyUser.map( function (user) {
                user.value = user.mail.toLowerCase();
                return user;
            });
        }
        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(item) {
                return (item.value.indexOf(lowercaseQuery) === 0);
            };
        }
    }
    
    openForm() {
        if(this.showAddForm) {
            this.event= {};
            this.showAddForm = false;
        } else {
            this.showAddForm = true;
        }
    }
    submit() {
        this.event.creator = Meteor.user()._id;
        this.event.createdAt = new Date();

        Events.insert(this.event);

        this.showAddForm = false;
        this.event = {};
    }

    payForAccount() {
          //event.preventDefault();
          
          var cardDetails = { // come from Stripe.js documentation
              "number": this.payment.cardNumber,
              "cvc": this.payment.cardCVC,
              "exp_month": this.payment.cardExpiryMM,
              "exp_year": this.payment.cardExpiryYY
          }

         
          
          Stripe.createToken(cardDetails, function(status, result) {
              if (result.error) {
                  alert(result.error.message);
              } else {
                  Meteor.call('chargeCard', result.id, function(err, response) {
                     if (err) {
                         alert(err.message);
                     } else {
                         var currentUserMail = Meteor.user();
                         if (currentUserMail) {
                            Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.paid": true}});
                         }
                         alert('Thank you! You just got an unlimited access of EasyParty!');
                     }
                  })
              }
          })

    }
}

const name = 'eventList';


export default angular.module(name, [
    angularMeteor,
    ngMaterial,
    uiRouter
]).component(name, {
    template,
    bindings: {
        myAttribute: '='
    },
    controllerAs: name,
    controller: EventList
})
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('event', {
            url: '/event',
            template: '<event-list></event-list>'
        })
}