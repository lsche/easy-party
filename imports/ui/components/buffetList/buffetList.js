/**
 * Created by karin on 29.06.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

import template from './buffetList.html';

import { Dishes } from '../../../api/dishes';
import { Buffet } from '../../../api/buffet';

class BuffetList {
    constructor($scope, $reactive, $state) {
        'ngInject';

        this.$state = $state;

        $reactive(this).attach($scope);

        this.showAddForm = false;
        this.selectedDishId = null;
        this.dish = {
            description: "",
            cook: "not yet assigned"
        };
        this.editDish = {id:"", name:"", cook:"", description:""};

        this.subscribe('buffet');
        this.subscribe('dishes');

        console.log(this.myEvent);
     //   this.buffetListId = Buffet.findOne({event: this.myEvent})._id;



        this.helpers({
            buffetObject() {
                return Buffet.findOne({event: this.myEvent});

            },
            dishList(){
                console.log("this is dishList");
                var buffetList = Buffet.findOne({event: this.myEvent});
                if(buffetList){
                    console.log(buffetList);
                    console.log(buffetList._id)
                    return Dishes.find({buffetID: buffetList._id});
                }
            console.log(Dishes);
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
        this.dish.buffetID = this.buffetListId;
        if (this.dish.description == ""){
            this.dish.description = "Add some text here..."
        }
        if (!(this.dish.name == "")){
            Dishes.insert(this.dish);
            console.log("dish inserted");
        } else {}
        this.dish = {};
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

const name = 'buffetList';

// create a module
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
        controller: BuffetList
    });
