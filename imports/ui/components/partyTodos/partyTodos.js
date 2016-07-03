import angular from 'angular';
import angularMeteor from 'angular-meteor';
import moment from 'moment';

import { Meteor } from 'meteor/meteor';

import template from './partyTodos.html';
import modalEditTemplate from './editTodosModal.html';

import { Todos } from '../../../api/todos';
import { Events } from '../../../api/events';
import { Activities } from '../../../api/activities';

import {name as EditTodos} from '../editTodos/editTodos';

class PartyTodos {
  constructor($stateParams, $scope, $mdDialog, $mdMedia, $reactive) {
    'ngInject';
    'mdDateTime';
    
    $reactive(this).attach($scope);
    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia;

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
    this.todo = {
      name: "",
      assignee: Meteor.userId(),
        duedate: new Date(),
        description:""
    };
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
          var name = Meteor.user().profile.firstName + " " + Meteor.user().profile.lastName;
          var planner = [{name: name, id: Meteor.userId(), mail: Meteor.user().emails[0].address}];
        }
        if(event){
          event.planner.forEach(function(person) {
            if(person != null){
              if(person.mail!= ""){
                planner.push(person);
              }
            }
          });
        }
        return planner;
      },
      categoryName() {
        return $stateParams.categoryName;
      },
        
    });
  }
  openForm() {
    this.selectedTodoId = null;
    if(this.showAddForm) {
      this.todo = {name: "",
          assignee: Meteor.userId(),
          duedate: new Date(),
          description:""};
      this.showAddForm = false;
    } else {
      this.showAddForm = true;
    }
  }
   minDate = new Date();
    
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


      this.todo = {
          name: "",
          assignee: Meteor.userId(),
          duedate: new Date(),
          description:""
      };
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
    this.$mdDialog.show({
      controller($scope, $mdDialog) {
        'ngInject';
        $scope.task = todo;

        this.close = () => {
          $mdDialog.hide();
        }


      },
      controllerAs: 'editTodosModal',
      template: modalEditTemplate,
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: this.$mdMedia('sm') || this.$mdMedia('xs')
    });
  }
}

const name = 'partyTodos';

// create a module
export default angular.module(name, [
  angularMeteor,
  EditTodos,'ngMessages'
]).component(name, {
  template,
  bindings: {
    myAttr: '=',
    myCategory: '='
  },
  controllerAs: name,
  controller: PartyTodos
});
