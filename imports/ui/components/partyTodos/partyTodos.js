import angular from 'angular';
import angularMeteor from 'angular-meteor';
import moment from 'moment';

import { Meteor } from 'meteor/meteor';

import template from './partyTodos.html';

import { Todos } from '../../../api/todos';
import { Events } from '../../../api/events';
import { Activities } from '../../../api/activities'

class PartyTodos {
  constructor($stateParams, $scope, $reactive) {
    'ngInject';
    'mdDateTime';
    
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
    this.showEditForm = true;
    this.selectedTodoId = null;
    this.todo = {};
    this.sort = '';
    this.subscribe('events');
    this.subscribe('todos');
    this.subscribe('users');
    this.subscribe('activities');


    //this.eventId = $stateParams.eventId;
    this.helpers({
      todoslist() {
        switch(this.getReactively('sort')) {
          case 'Status':
            return Todos.find({ event_Id: $stateParams.eventId, category: $stateParams.categoryName },{sort: {done: 1, duedate: 1}});
            break;
          case 'Assignee':
            return Todos.find({ event_Id: $stateParams.eventId, category: $stateParams.categoryName },{sort: {assignee: 1, done: 1, duedate: 1}});
            break;
          case 'Date':
            return Todos.find({ event_Id: $stateParams.eventId, category: $stateParams.categoryName },{sort: {duedate: 1}});
            break;
          default:
            return Todos.find({ event_Id: $stateParams.eventId, category: $stateParams.categoryName },{sort: {done: 1, duedate: 1}});
        }
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
    
    Todos.insert(this.todo, function(error, result){
      if(result){
        Activities.insert({text: "Added Todo"});
        console.log("Actvitiy added");
      }
    });


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
  deleteTodo(todo){
    Todos.remove(todo._id);
  }
  editTodo(todo){
    //this.showEditForm = true;
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
