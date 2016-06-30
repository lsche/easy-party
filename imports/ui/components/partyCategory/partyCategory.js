import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Template } from 'meteor/templating';

import template from './partyCategory.html';
import { Events } from '../../../api/events';

import { name as PartyTodos } from '../partyTodos/partyTodos';
import { name as PartyComment } from '../partyComment/partyComment';
import { name as PartyNotes } from '../partyNotes/partyNotes';
import {name as EventGuestList} from '../eventGuestList/eventGuestList';


class PartyCategory {
  constructor($stateParams, $scope, $mdDialog, $mdMedia, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    $scope.selected = [];

      this.$mdDialog = $mdDialog;
      this.$mdMedia = $mdMedia;
    
    this.subscribe('events');
    this.subscribe('users');
    
    this.category = $stateParams.categoryName.charAt(0).toUpperCase() + $stateParams.categoryName.slice(1);
      this.eventId = $stateParams.eventId;
    
    this.helpers({
       eventId() {
           return $stateParams.eventId;
       },
       categoryName() {
           return $stateParams.categoryName;
       }
    });
  }
}

const name = 'partyCategory';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  PartyTodos,
  PartyComment,
  PartyNotes, 
    EventGuestList,
  
]).component(name, {
  template,
  controllerAs: name,
  controller: PartyCategory
})
  .config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('category', {
      url: '/:eventId/category/:categoryName',
      template: '<party-category></party-category>'
    });
}
