import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

import template from './editTodos.html';


import { Todos } from '../../../api/todos';
import { Events } from '../../../api/events';

class EditTodos {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';

        this.$state = $state;
        this.$stateParams = $stateParams;
        $reactive(this).attach($scope);

        this.subscribe('events');

        this.error = '';
        this.helpers({
            getEventPlanner(){
                var event = Events.findOne($stateParams.eventId);
                if(Meteor.user()){
                    var name = Meteor.user().profile.firstName + " " + Meteor.user().profile.lastName;
                    var planner = [{name: name, id: Meteor.userId(), mail: Meteor.user().emails[0].address}];
                }
                if(event){
                    event.planner.forEach(function(person) {
                        planner.push(person);
                    });
                }
                return planner;
            }
        });
    }

    save(){
        Todos.update({_id: this.myTask._id},
            {$set:
                    {name: this.myTask.name,
                    description: this.myTask.description ,
                    assignee: this.myTask.assignee, 
                    duedate: this.myTask.duedate}
            }
        );
        //to close the modal
        if(this.done) {
            this.done();
        }
    }
}



const name = 'editTodos';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter
])
    .component(name, {
        template,
        bindings: {
            myTask: '=',
            done: '&?'
        },
        controllerAs: name,
        controller: EditTodos
    });
