import angular from 'angular';
import angularMeteor from 'angular-meteor';
import moment from 'moment';

import { Meteor } from 'meteor/meteor';

import template from './editEvent.html';

import { Events } from '../../../api/events';

class EditEvent {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';

        this.$state = $state;
        this.$stateParams = $stateParams;
        $reactive(this).attach($scope);

        this.subscribe('events');

       //this.myEvent._id;

        this.helpers({

        });
    }

    saveChanges() {
        // TODO update database

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
