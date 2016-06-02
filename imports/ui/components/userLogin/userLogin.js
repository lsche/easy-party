import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

import template from './userLogin.html';

import { name as Register } from '../register/register';

class UserLogin {
    constructor($scope, $reactive, $state) {
        'ngInject';

        this.$state = $state;

        $reactive(this).attach($scope);

        this.credentials = {
            email: '',
            password: ''
        };

        this.error = '';
    }

    login() {
        Meteor.loginWithPassword(this.credentials.email, this.credentials.password,
            this.$bindToContext((err) => {
                if (err) {
                    this.error = err;
                } else {

                    //to close the modal
                    if(this.done) {
                        this.done();
                    }
                    //TODO: provide correct route
                    this.$state.go('parties');
                }
            })
        );
    }
}

const name = 'userLogin';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter
])
    .component(name, {
        template,
        bindings: {
            done: '&?'
        },
        controllerAs: name,
        controller: UserLogin
    });

//TODO s. userREgistration oder Login .config