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
        this.buffetBool = false;
        this.showLink = false;
        this.selectedDishId = null;
        this.dish = {
            cook: "",
            description: ""
        };

        this.editDish = {id:"", name:"", cook:"", description:""};
        this.editBuffet = {id:"", description: "", url:""};


        this.subscribe('buffet');
        this.subscribe('dishes');

        this.helpers({
            buffetObject() {
                return Buffet.findOne({event: this.myEvent});

            },
            dishList(){
                var buffetList = Buffet.findOne({event: this.myEvent});
                if(buffetList){
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
                this.dish.cook = "Not yet assigned";
            }
            if (this.dish.description == ""){
                this.dish.description = "Add some additional text here";
            }
            Dishes.insert(this.dish);
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
    editBuffetDescription (){
        this.editBuffet.description = Buffet.findOne({event: this.myEvent}).description;
        this.editBuffet.url = "";
        this.buffetBool = true;
    }
    saveBuffetDescription (){
        var buffetid = Buffet.findOne({event: this.myEvent})._id;
        Buffet.update({_id: buffetid},
            {$set: {
                description: this.editBuffet.description}
            });
        this.editBuffet = {id:"", description:"", url:""};
        this.buffetBool = false;
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

    displayLink(){
        var buffetListID = Buffet.findOne({event: this.myEvent})._id;
        var urlStart = "http://localhost:3000/";
        Buffet.update({_id: buffetListID},
            {$set: {
                url: urlStart + this.myEvent + "/" + buffetListID
            }});
        this.showLink = true;
    }
    closeLink(){
        this.showLink = false;
    }
}

const name = 'buffetList';

export default angular.module(name, [
        angularMeteor,
        uiRouter,
        'ngMessages'
    ])
    .component(name, {
        template,
        bindings: {
            myEvent: '='
        },
        controllerAs: name,
        controller: BuffetList
    });
