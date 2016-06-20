/**
 * Created by Anna on 19.06.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Template } from 'meteor/templating';

import { Events } from '../../../api/events';

import { name as PartyTodos } from '../partyTodos/partyTodos';
import { name as PartyComment } from '../partyComment/partyComment';
import { name as PartyNotes } from '../partyNotes/partyNotes';



class EventGuestCategory {
    constructor($stateParams, $scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

        $scope.selected = [];


        this.subscribe('events');
        this.subscribe('users');
        this.subscribe('guests');

        this.eventId = $stateParams.eventId;

        this.helpers({
            eventId() {
                return $stateParams.eventId;
            },

        });
    }
}

const name = 'eventGuestCategory';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    PartyTodos,
    PartyNotes,
    
]).component(name, {
    template,
    controllerAs: name,
    controller: EventGuestCategory
})
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('eventGuestCategory', {
            url: '/:eventId/category/eventGuestCategory',
            template: '<event-guest-category></event-guest-category>'
        });
}
