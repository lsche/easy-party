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

    openForm(){
        this.selectedDishId = null;
        if (this.showAddForm){
            this.dish = {};
            this.showAddForm = false;
        } else {
            this.showAddForm = true;
        }
    }

    selectDish(dish){
        this.selectedDishId = dish._id;
    }
    deselectDish(){
        this.selectedDishId = null;
    }

    submit(){
        var buffetList = Buffet.findOne({event: this.myEvent});
        if(buffetList)
        {
            this.dish.buffetID = buffetList._id;
        }
        if (!(this.dish.name == "")){
            if (this.dish.cook == ""){
                console.log("set cook");
                this.dish.cook = "Not yet assigned";
            }
            if (this.dish.description == ""){
                console.log("set description");
                this.dish.description = "Add some additional text here";
            }
            Dishes.insert(this.dish);
            console.log("dish inserted");
            console.log(this.dish);
        } else {}
        this.dish = {cook: "", description: ""};
        this.showAddForm = false;

    }
    deleteDish(dish){
        Dishes.remove(dish._id);
    }
    editDishName(dish){
        this.editDish.id = dish._id;
        this.editDish.name = dish.name;
        this.editDish.cook = "";
        this.editDish.description = "";
    }
    editDishCook(dish){
        this.editDish.id = dish._id;
        this.editDish.name = "";
        this.editDish.cook = dish.cook;
        this.editDish.description = "";
    }
    editDishDescription(dish){
        this.editDish.id = dish._id;
        this.editDish.name = "";
        this.editDish.cook = "";
        this.editDish.description = dish.description;
    }
    saveDishName(){
        Dishes.update({_id: this.editDish.id},
            {$set: {
                name: this.editDish.name}
            });
        this.editDish = {id:"", name:"", cook:"", description:""};
    }
    saveDishCook(){
        Dishes.update({_id: this.editDish.id},
            {$set: {
                cook: this.editDish.cook}
            });
        this.editDish = {id:"", name:"", cook:"", description:""};
    }
    saveDishDescription(){
        Dishes.update({_id: this.editDish.id},
            {$set: {
                description: this.editDish.description}
            });
        this.editDish = {id:"", name:"", cook:"", description:""};
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

