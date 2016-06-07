import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';
import { Events } from '../../../api/events';
import { Todos } from '../../../api/todos';

import template from './partyDashboard.html';


class PartyDashboard{
  constructor($stateParams, $scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.eventId = $stateParams.eventId;


    this.subscribe('events');
    this.subscribe('todos');
    this.subscribe('users');


    this.helpers({
      currentEvent(){
        return Events.findOne(this.eventId);
      },
      procent() {
        var allTodos = Todos.find({event_Id: this.eventId}).count();
        if (allTodos == 0) {
          return 0;
        } else {
          var allDoneTodos = Todos.find({event_Id: this.eventId, done: false}).count();
          var f = Math.ceil( allDoneTodos / allTodos * 100);
          return f; 
        }
         
    },
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
