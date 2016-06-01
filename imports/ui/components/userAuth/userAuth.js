import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import template from './userAuth.html';
import modalRegistrationTemplate from './userRegisterModal.html';
import { name as DisplayNameFilter } from '../../filters/displayNameFilter';
//TODO probably something missing here: vgl Line 6 in partyAddButton.js
//TODO probably something missing here: vgl Line 9-11 in auth.js
import { name as Login } from '../login/login';
import { name as Register } from '../register/register';
import { name as Password } from '../password/password';

const name = 'userAuth';

class UserAuth {
    constructor($scope, $reactive, $mdDialog, $mdMedia) {
        'ngInject';

        $reactive(this).attach($scope);

        this.$mdDialog = $mdDialog;
        this.$mdMedia = $mdMedia;

        this.helpers({
            isLoggedIn() {
                return !!Meteor.userId();
            },
            currentUser() {
                return Meteor.user();
            }
        });
    }

    logout() {
        Accounts.logout();
    }
    openRegistration(event){
        this.$mdDialog.show({
            controller($mdDialog) {
                'ngInject';

                this.close = () => {
                    $mdDialog.hide();
                }
            },
            controllerAs: 'userRegisterModal',
            template: modalRegistrationTemplate,
            targetEvent: event,
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            fullscreen: this.$mdMedia('sm') || this.$mdMedia('xs')
        });
    }
}

// create a module
export default angular.module(name, [
    angularMeteor,
    DisplayNameFilter,
    Login,
    Register,
    Password
    //TODO: evtl fehlt hier etwas. vgl partyaddButton.js line 40
    //TODO: evtl fehlt hier etwas. vgl auth.js line 40-43
]).component(name, {
    template,
    controllerAs: name,
    controller: UserAuth
});