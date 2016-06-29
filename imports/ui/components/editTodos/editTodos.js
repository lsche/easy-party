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
            }
        });
    }

    save(){
        console.log("save pressed3");
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
