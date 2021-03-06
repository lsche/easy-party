import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Accounts } from 'meteor/accounts-base';

import template from './userRegistration.html';

class UserRegistration {
    constructor($scope, $reactive, $state) {
        'ngInject';

        this.$state = $state;

        $reactive(this).attach($scope);
        
        var randCol = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
            
        this.credentials = {
            email: '',
            password: '',
            profile:{
                firstName: '',
                lastName: '',
                color: randCol,
                //paid: false,
                created: Date.now()
            },      
        };
        
        
        

        this.error = '';
    }

    register() {
        console.log(this.credentials);
        Accounts.createUser(this.credentials,
            this.$bindToContext((err) => {
                if (err) {
                    this.error = err;
                } else {

                    //to close the modal
                    if(this.done) {
                        this.done();
                    }
                    
                    this.$state.go('event');
                }
            })
        );
    }
}

const name = 'userRegistration';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter
]).component(name, {
    template,
    bindings: {
        done: '&?'
    },
    controllerAs: name,
    controller: UserRegistration
});

