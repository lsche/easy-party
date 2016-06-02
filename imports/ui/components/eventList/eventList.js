// Karin - backend for content of start page

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';

import template from './eventList.html';

class EventList {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);
        
    }
}

const name = 'eventList';


export default angular.module(name, [
    angularMeteor,
    ngMaterial,
    uiRouter
]).component(name, {
    template,
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