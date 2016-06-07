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
      return moment(jsonDate).format('DD-MM-YYYY');
    };

    $scope.getName = function(userId){
      var user = Meteor.users.findOne({_id: userId});
      if(user){
        return user.profile.firstName;
      } else{
        return "no name";
      }
    };
    this.category = $stateParams.categoryName.charAt(0).toUpperCase() + $stateParams.categoryName.slice(1);
    this.showAddForm = false;
    this.selectedTodoId = null;
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
      getEventPlanner(){
        var event = Events.findOne($stateParams.eventId);
        if(Meteor.user()){
          var planner = [{name: Meteor.user().profile.firstName, id: Meteor.userId(), mail: Meteor.user().emails[0].address}];
        }
        if(event){
          event.planner.forEach(function(person) {
            var user = Meteor.users.findOne({emails: {$elemMatch: {address: person.mail }}});
            if(user){
              //safe object with name and id in planner
              planner.push({name: user.profile.firstName, id: user._id, mail: person.mail});
            }
          });
        }
        return planner;
      },
      categoryName() {
        return $stateParams.categoryName;
      }
    });
  }
  openForm() {
    this.selectedTodoId = null;
    if(this.showAddForm) {
      this.todo = {};
      this.showAddForm = false;
    } else {
      this.showAddForm = true;
    }
  }

  selectTodo(todo){
    if(this.selectedTodoId == todo._id){
      this.selectedTodoId = null;
    } else {
      this.selectedTodoId = todo._id;
    }
  }

  submit() {
    this.todo.creater = Meteor.user()._id;
    this.todo.event_Id = this.myAttr;
    this.todo.category = this.myCategory;
    this.todo.done = false;
    
    Todos.insert(this.todo);


    this.todo = {};
    this.showAddForm = false;
  }
  
  clickCheckBox(todo){
    if(todo.done){
      Todos.update(todo._id, {
        $set: { done: false}
      });
    } else {
      Todos.update(todo._id, {
        $set: { done: true}
      });
    }
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
