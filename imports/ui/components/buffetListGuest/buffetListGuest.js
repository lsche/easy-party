import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

import template from './buffetListGuest.html';

import { Dishes } from '../../../api/dishes';
import { Buffet } from '../../../api/buffet';

class BuffetListGuest{
    constructor($scope, $reactive, $stateParams) {
        'ngInject';


        this.eventId = $stateParams.eventId;
        this.buffetID = $stateParams.buffetID;

        $reactive(this).attach($scope);

        this.showAddForm = false;
        this.buffetBool = false;
        this.selectedDishId = null;
        this.dish = {
            cook: "",
            description: ""
        };

        this.editDish = {id:"", name:"", cook:"", description:""};



        this.subscribe('buffet');
        this.subscribe('dishes');

        console.log(this.myEvent);



        this.helpers({
            buffetObject() {
                return Buffet.findOne({event: this.myEvent});

            },
            dishList(){
                var buffetList = Buffet.findOne({event: this.myEvent});
                if(buffetList){
                    console.log(buffetList);
                    console.log(buffetList._id);
                    return Dishes.find({buffetID: buffetList._id});
                }
            }
        });
    }

}

const name = 'buffetListGuest';


export default angular.module(name, [
        angularMeteor,
        uiRouter
    ])
    .component(name, {
        template,
        bindings: {
            myEvent: '='
        },
        controllerAs: name,
        controller: BuffetListGuest
    })
    .config(config);


function config($stateProvider) {
    'ngInject';

    $stateProvider.state('buffetListGuest', {
     //   url: '/:eventId/:buffetID',
        url: 'http://localhost:3000/3Qgse3ywuBfuQQTfj/eRN8TmremLKcZyh4Y',
        template: '<buffetListGuest></buffetListGuest>'
 /*       resolve: {
            currentUser($q) {
                if (Meteor.userId() === null) {
                    return $q.reject('AUTH_REQUIRED');
                } else {
                    return $q.resolve();
                }
            }
        }*/
    });


}

