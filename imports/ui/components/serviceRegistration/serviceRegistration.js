import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Accounts } from 'meteor/accounts-base';
import { Providers } from '../../../api/providers'

import { name as PartyUpload } from '../partyUpload/partyUpload';

import template from './serviceRegistration.html';

class ServiceRegistration {
    constructor($scope, $reactive, $state) {
        'ngInject';

        this.$state = $state;

        $reactive(this).attach($scope);
        this.provider = {};

        this.items = ["Drink & Dance (Party)","Birthday(-Dinner)","Wedding Venue","Conference/Seminar"];
        this.itemsCatering = ["Drink & Dance (Party)","Birthday(-Dinner)","Wedding Venue","Conference/Seminar"];
        this.itemsEntertainment = ["Drink & Dance (Party)","Birthday(-Dinner)","Wedding Venue","Conference/Seminar"];
        this.provider.type = [];
            
          
        this.toggle = function (item, list) {
            
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            }
            else {
                list.push(item);
            }
        };

        this.exists = function (item, list) {
            return list.indexOf(item) > -1;
        };
        
        

        this.error = '';
    }

    register() {
        console.log(this.provider);
        var spacing = " ";  
        this.provider.tags = 
            this.provider.name.concat(spacing)
            .concat(this.provider.city).concat(spacing)
            .concat(this.provider.street).concat(spacing)
            .concat(this.provider.zip).concat(spacing)
            .concat(this.provider.phone).concat(spacing)
            .concat(this.provider.email).concat(spacing)
            .concat(this.provider.about).concat(spacing)
            .concat(this.provider.type).concat(spacing)
            .concat(this.provider.price).concat(spacing)
            .concat(this.provider.category);

        Providers.insert(this.provider,
            this.$bindToContext((err) => {
                if (err) {
                    this.error = err;
                } else {

                    //to close the modal
                    if(this.done) {
                        this.done();
                    }
                    
                    this.$state.go('/');
                }
            })
        );
    }

    showDiv(elem) {
        console.log(elem);
    }
}

const name = 'serviceRegistration';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    PartyUpload
]).component(name, {
    template,
    bindings: {
        done: '&?'
    },
    controllerAs: name,
    controller: ServiceRegistration
});

