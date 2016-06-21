import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import template from './userAuth.html';
import modalRegistrationTemplate from './userRegisterModal.html';
import modalLoginTemplate from './userLoginModal.html';
import modalProviderTemplate from './providerRegisterModal.html';

import { name as DisplayNameFilter } from '../../filters/displayNameFilter';
import { name as UserRegistration } from '../userRegistration/userRegistration';
import { name as UserLogin } from '../userLogin/userLogin';
import { name as ServiceRegistration } from '../serviceRegistration/serviceRegistration';



const name = 'userAuth';

class UserAuth {
    constructor($scope, $reactive, $mdDialog, $mdMedia, $state) {
        'ngInject';

        this.$state = $state;

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
        this.$state.go('start');
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
    openLogin(event){
        this.$mdDialog.show({
            controller($mdDialog) {
                'ngInject';

                this.close = () => {
                    $mdDialog.hide();
                }
            },
            controllerAs: 'userLoginModal',
            template: modalLoginTemplate,
            targetEvent: event,
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            fullscreen: this.$mdMedia('sm') || this.$mdMedia('xs')
        });
    }
    openProvider(event){
        this.$mdDialog.show({
            controller($mdDialog) {
                'ngInject';

                this.close = () => {
                    $mdDialog.hide();
                }
            },
            controllerAs: 'providerRegisterModal',
            template: modalProviderTemplate,
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
    UserRegistration,
    UserLogin,
    ServiceRegistration
]).component(name, {
    template,
    controllerAs: name,
    controller: UserAuth
});