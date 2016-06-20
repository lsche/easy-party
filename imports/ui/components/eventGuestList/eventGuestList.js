import angular from 'angular';
import angularMeteor from 'angular-meteor';
import moment from 'moment';

import { Meteor } from 'meteor/meteor';

import template from './eventGuestList.html';

import { Guests } from '../../../api/guests';
import { Events } from '../../../api/events';

class EventGuestList {
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


        //this.eventId = $stateParams.eventId;
        this.helpers({
            guestList() {
                switch(this.getReactively('sort')) {
                    case 'Status':
                        return Guests.find({ event_Id: $stateParams.eventId, category: $stateParams.categoryName },{sort: {status: 1}});
                        break;
                    case 'Number':
                        return Guests.find({ event_Id: $stateParams.eventId, category: $stateParams.categoryName },{sort: {number: 1}});
                        break;
                    default:
                        return Guests.find({ event_Id: $stateParams.eventId, category: $stateParams.categoryName },{sort: {name: 1}});
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
        this.selectedGuestId = null;
        if(this.showAddForm) {
            this.guest = {};
            this.showAddForm = false;
        } else {
            this.showAddForm = true;
        }
    }



    submit() {
        this.guest.creater = Meteor.user()._id;
        this.guest.event_Id = this.myAttr;
        this.guest.category = this.myCategory;

        Guests.insert(this.guest);


        this.guest = {};
        this.showAddForm = false;
    }


    deleteGuest(todo){
        Guests.remove(guest._id);
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
    controller: EventGuestList
});
