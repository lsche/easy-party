import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

import template from './partyDashboard.html';


class PartyDashboard{
  constructor($stateParams, $scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.eventId = $stateParams.eventId;

    this.subscribe('events');
    this.subscribe('users');

    this.helpers({
      users() {
        return Meteor.users.find({});
      },
      isLoggedIn() {
        return !!Meteor.userId();
      }
    });
  }

  logEvent(){
    console.log(this.eventId);
  }

}

const name = 'partyDashboard';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter
]).component(name, {
  template,
  controllerAs: name,
  controller: PartyDashboard
})
  .config(config);


function config($stateProvider) {
  'ngInject';

  $stateProvider.state('partyDashboard', {
    url: '/:eventId/category',
    template: '<party-dashboard></party-dashboard>',
    resolve: {
      currentUser($q) {
        if (Meteor.userId() === null) {
          return $q.reject('AUTH_REQUIRED');
        } else {
          return $q.resolve();
        }
      }
    }
  });
  
  
}
