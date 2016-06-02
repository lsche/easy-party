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

        this.credentials = {
            email: '',
            password: '',
            profile:{
                firstName: '',
                lastName: ''
            }
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

                    //TODO: should go to list of projects!
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

//TODO: evtl hier das config von register.js
