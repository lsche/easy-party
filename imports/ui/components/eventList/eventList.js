// Karin - backend for content of start page

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';

import template from './eventList.html';

import { name as CreateEvent } from '../createEvent/createEvent';

import { Events } from '../../../api/events';
import { Meteor } from 'meteor/meteor';


class EventList {
    constructor($scope, $reactive) {
        'ngInject';

        this.showAddForm = false;


        $reactive(this).attach($scope);

        this.event = {};
        
        this.subscribe('events');
        this.subscribe('users');

        this.helpers({
            events() {
                return Events.find({});
            }
        });

    }
    openForm() {
        this.showAddForm = true;
    }
    submit() {
        this.event.creator = Meteor.user()._id;

        Events.insert(this.event);

        this.showAddForm = false;

        this.event = {};
    }

}

const name = 'eventList';


export default angular.module(name, [
    angularMeteor,
    ngMaterial,
    uiRouter,
    CreateEvent
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