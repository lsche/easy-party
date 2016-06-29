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

        this.subscribe('buffet');
        this.subscribe('dishes');

        console.log(this.myEvent);

      //  this.error = '';

        this.helpers({
            buffetObject() {
                return Buffet.findOne({event: this.myEvent});

            },
            dishList(){
                console.log(Buffet.findOne({event: this.myEvent}));
                this.buffetListId = Buffet.findOne({event: this.myEvent})._id;
                console.log("function buffet "+ this.buffetListId);

                //var buffetID = buffetObject._id;

                //console.log(buffetID);
                //return buffetID;
              //  return Dishes.find({buffet_id: buffetID});
            }
        });

    }
    save(){
        this.buffetListId = Buffet.findOne({event: this.myEvent})._id;
        console.log("save function buffet "+ this.buffetListId);
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
