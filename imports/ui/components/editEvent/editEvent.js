import angular from 'angular';
import angularMeteor from 'angular-meteor';
import moment from 'moment';

import { Meteor } from 'meteor/meteor';

import template from './editEvent.html';

import { Events } from '../../../api/events';

class EditEvent {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';

        var self = this;

        this.$state = $state;
        this.$stateParams = $stateParams;
        $reactive(this).attach($scope);

        this.subscribe('events');
        var handle = Meteor.subscribe('users');

        Tracker.autorun(function() {
            if (handle.ready())
                self.repos = loadAll();
        });

       //this.myEvent._id;
        this.showHelperAddForm =false;
        console.log(this.myEvent);

        this.editEvent = this.myEvent;


        this.helpers({
        });

        self.simulateQuery = false;
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


    addHelper(){
        this.showHelperAddForm = true;
    }

    save() {
        // add selectedItem to editEvent.planner
        if(this.selectedItem != null){
            var helpercount = 0;
            this.editEvent.planner.forEach(function(person) {
                if(person != null){
                    if(person.mail != ""){
                        helpercount++
                    }
                }
            });
            console.log(helpercount);
            this.editEvent.planner[helpercount] = this.selectedItem;
        }

        Events.update({_id: this.editEvent._id},
            {$set: {
                name: this.editEvent.name,
                description: this.editEvent.description,
                event_date: this.editEvent.event_date,
                planner: this.editEvent.planner
            }}
        );
        if(this.done) {
            this.done();
        }
    }
}



const name = 'editEvent';

// create a module
export default angular.module(name, [
    angularMeteor
])
    .component(name, {
        template,
        bindings: {
            myEvent: '=',
            done: '&?'
        },
        controllerAs: name,
        controller: EditEvent
    });
