import angular from 'angular';
import angularMeteor from 'angular-meteor';
import moment from 'moment';

import { Meteor } from 'meteor/meteor';

import template from './partyTodos.html';

import { Todos } from '../../../api/todos';
import { Events } from '../../../api/events';

class PartyTodos {
  constructor($stateParams, $scope, $reactive) {
    'ngInject';
    
    $reactive(this).attach($scope);

    $scope.parseDate = function(jsonDate) {
      //date parsing functionality
      return moment(jsonDate).format('DD-MM-YYYY');;
    };

    this.showAddForm = false;
    this.todo = {};
    this.subscribe('events');
    this.subscribe('todos');
    this.subscribe('users');
    
    //this.eventId = $stateParams.eventId;
    this.helpers({
      todoslist() {
        return Todos.find({ event_Id: $stateParams.eventId, category: $stateParams.categoryName });
      },
      eventId() {
        return $stateParams.eventId;
      },
      categoryName() {
        return $stateParams.categoryName;
      }
    });
  }
  openForm() {
    this.showAddForm = true;
  }

  submit() {
    this.todo.creater = Meteor.user()._id;
    this.todo.event_Id = this.myAttr;
    this.todo.category = this.myCategory;

    Todos.insert(this.todo);


    this.todo = {};
    this.showAddForm = false;
  }
}

const name = 'partyTodos';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  bindings: {
    myAttr: '=',
    myCategory: '='
  },
  controllerAs: name,
  controller: PartyTodos
});
