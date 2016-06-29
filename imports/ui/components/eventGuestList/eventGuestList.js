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
        this.selectedGuestId = null;
        this.guest = {};
        this.sort = '';
        this.subscribe('events');
        this.subscribe('guests');
        this.subscribe('users');
        this.editGuest={id:"",name:"", number:"",status:"", description:""};
        


        //this.eventId = $stateParams.eventId;
        this.helpers({
            guestList() {
                switch(this.getReactively('sort')) {
                    case 'Status':
                        return Guests.find({ event_Id: $stateParams.eventId},{sort: {status: 1, name: 1}});
                        break;
                    case 'Number':
                        return Guests.find({ event_Id: $stateParams.eventId},{sort: {number: 1, name: 1}});
                        break;
                    default:
                        return Guests.find({ event_Id: $stateParams.eventId},{sort: {name: 1}});
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
    

    selectGuest(guest){
        if(this.selectedGuestIdId == guest._id){
            this.selectedGuestId = null;
        } else {
            this.selectedGuestId = guest._id;
        }
    }

    submit() {
        this.guest.creater = Meteor.user()._id;
        this.guest.event_Id = this.myAttr;

        Guests.insert(this.guest);

        this.guest = {};
        this.showAddForm = false;
    }

    
    deleteGuest(guest){
        Guests.remove(guest._id);
    }

    editGuestName(guest) {
        this.editGuest.id= guest._id;
        this.editGuest.name= guest.name;
        this.editGuest.number = "";
        this.editGuest.status = "";
        this.editGuest.description = "";
    }

    editGuestNumber(guest) {
        this.editGuest.id= guest._id;
        this.editGuest.number = guest.number;
        this.editGuest.name = "";
        this.editGuest.status = "";
        this.editGuest.description = "";
    }

    editGuestStatus(guest) {
        this.editGuest.id= guest._id;
        this.editGuest.status = guest.status;
        this.editGuest.name = "";
        this.editGuest.number = "";
        this.editGuest.description = "";
    }

    editGuestDescription(guest) {
        this.editGuest.id= guest._id;
        this.editGuest.status = "";
        this.editGuest.name = "";
        this.editGuest.number = "";
        this.editGuest.description = guest.description;
    }

    saveGuestName() {
        console.log(this.editGuest);
        Guests.update({_id : this.editGuest.id},
            {$set: {
            name: this.editGuest.name}
            });
        this.editGuest={id:"",name:"", number:"",status:"",description:""};
    }

    saveGuestNumber() {
        console.log(this.editGuest);
        Guests.update({_id : this.editGuest.id},
            {$set: {
                number: this.editGuest.number}
            });
        this.editGuest={id:"",name:"", number:"",status:"",description:""};
    }

    saveGuestStatus() {
        console.log(this.editGuest);
        Guests.update({_id : this.editGuest.id},
            {$set: {
                status: this.editGuest.status}
            });
        this.editGuest={id:"",name:"", number:"",status:"",description:""};
    }

    saveGuestDescription() {
        Guests.update({_id : this.editGuest.id},
            {$set: {
                description: this.editGuest.description}
            });
        this.editGuest={id:"",name:"", number:"",status:"",description:""};
    }
}

const name = 'eventGuestList';

// create a module
export default angular.module(name, [
    angularMeteor
]).component(name, {
    template,
    bindings: {
        myAttr: '='
    },
    controllerAs: name,
    controller: EventGuestList
});
