// Karin - backend for content of start page

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';

import template from './eventList.html';

import { Events } from '../../../api/events';
import { Meteor } from 'meteor/meteor';


class EventList {
    constructor($scope, $reactive, $timeout, $q, $log) {
        'ngInject';

        this.showAddForm = false;


        $reactive(this).attach($scope);

        this.event = {};
        
        this.subscribe('events');
        this.subscribe('users');

        this.helpers({
            events() {
                return Events.find({},{ sort: {createdAt: -1}});
            }
        });

        this.simulateQuery = false;
        this.isDisabled    = false;
        // list of `state` value/display objects
        this.states        = loadAll();
        this.querySearch   = querySearch;
        this.selectedItemChange = selectedItemChange;
        this.searchTextChange   = searchTextChange;
        this.newState = newState;
        function newState(state) {
            alert("Sorry! You'll need to create a Constituion for " + state + " first!");
        }
        // ******************************
        // Internal methods
        // ******************************
        /**
         * Search for states... use $timeout to simulate
         * remote dataservice call.
         */
        function querySearch (query) {
            var results = query ? this.states.filter( createFilterFor(query) ) : this.states,
                deferred;
            if (this.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }
        function searchTextChange(text) {
            $log.info('Text changed to ' + text);
        }
        function selectedItemChange(item) {
            $log.info('Item changed to ' + JSON.stringify(item));
        }
        /**
         * Build `states` list of key/value pairs
         */
        function loadAll() {
            var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';
            return allStates.split(/, +/g).map( function (state) {
                return {
                    value: state.toLowerCase(),
                    display: state
                };
            });
        }
        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) === 0);
            };
        }
    }
    
    openForm() {
        this.showAddForm = true;
    }
    submit() {
        this.event.creator = Meteor.user()._id;
        this.event.createdAt = new Date();

        Events.insert(this.event);

        this.showAddForm = false;

        this.event = {};
    }

    showSimpleToast(currentEvent){
        console.log(currentEvent.name + currentEvent._id);
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