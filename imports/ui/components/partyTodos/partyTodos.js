import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './partyTodos.html';

import { Todos } from '../../../api/todos';

class PartyTodos {
  constructor($stateParams, $scope, $reactive) {
    'ngInject';
    
    $reactive(this).attach($scope);
    
    this.todo = {};
    this.subscribe('todos');
    this.subscribe('users');
    
    //this.eventId = $stateParams.eventId;
    
  }

  submit() {
    this.todo.creater = Meteor.user()._id;
    this.todo.event_Id = this.myAttr;
    this.todo.category = this.myCategory;
    
    Todos.insert(this.todo);

    if(this.done) {
      this.done();
    }

    this.reset();
  }

  reset() {
    this.todo = {};
  }
}

const name = 'partyTodos';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  bindings: {
    done: '&?',
    myAttr: '=',
    myCategory: '='
  },
  controllerAs: name,
  controller: PartyTodos
});
