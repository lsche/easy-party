import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import moment from 'moment';

import { Template } from 'meteor/templating';

import template from './partyCategory.html';
import { Events } from '../../../api/events';
import { Parties } from '../../../api/parties';
import { Todos } from '../../../api/todos';
import { Comments } from '../../../api/comments';
import { Notes } from '../../../api/notes';

import { name as PartyTodos } from '../partyTodos/partyTodos';
import { name as PartyComment } from '../partyComment/partyComment';
import { name as PartyNotes } from '../partyNotes/partyNotes';



class PartyCategory {
  constructor($stateParams, $scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);
    
     
    

      $scope.parseDate = function(jsonDate) {
         //date parsing functionality
         return moment(jsonDate).format('DD-MM-YYYY');
      };
    
    $scope.selected = [];

    $scope.query = {
      order: 'name',
      limit: 5,
      page: 1
    };
    
    
    this.subscribe('events');
    this.subscribe('todos');
    this.subscribe('comments');
    this.subscribe('notes');
    this.subscribe('users');
    
    this.category = $stateParams.categoryName.charAt(0).toUpperCase() + $stateParams.categoryName.slice(1);
      this.eventId = $stateParams.eventId;
    
    this.helpers({
       todoslist() {
           return Todos.find({ event_Id: $stateParams.eventId, category: $stateParams.categoryName });
       },
       commentslist() {
           return Comments.find({ event_Id: $stateParams.eventId, category: $stateParams.categoryName });
       },
       noteslist() {
           return Notes.find({ event_Id: $stateParams.eventId, category: $stateParams.categoryName });
       },
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
  PartyNotes
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
