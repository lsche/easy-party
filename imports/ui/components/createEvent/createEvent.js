import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './createEvent.html';

import { Events } from '../../../api/events';

class CreateEvent {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

        this.transferValue = false;

        this.event = {};
        this.subscribe('events');
        this.subscribe('users');
        //this.eventId = $stateParams.eventId;

        this.helpers({
            transferValue(){
                return this.transferValue;
            }

        });

    }

    submit() {
        this.event.creator = Meteor.user()._id;

        Events.insert(this.event);
        
        this.transferValue = false;
        
        if(this.done) {
            this.done();
        }

        this.reset();
    }

    reset() {
        this.event = {};
    }
}

const name = 'createEvent';

// create a module
export default angular.module(name, [
    angularMeteor
]).component(name, {
    template,
    controllerAs: name,
    controller: CreateEvent
});
