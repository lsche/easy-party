import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import moment from 'moment';

import { Meteor } from 'meteor/meteor';
import template from './providersList.html';
import { Providers } from '../../../api/providers';
import { name as PartyImage } from '../partyImage/partyImage';
import { name as ProvidersSearch } from '../providersSearch/providersSearch';

class ProvidersList {
    constructor($scope, $reactive, $timeout, $q, $log, $state) {
        'ngInject';

        $reactive(this).attach($scope);
    }
}

const name = 'providersList';


export default angular.module(name, [
    angularMeteor,
    ngMaterial,
    uiRouter,
    PartyImage,
    ProvidersSearch
]).component(name, {
    template,
    bindings: {
        myAttribute: '='
    },
    controllerAs: name,
    controller: ProvidersList
})
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('providers', {
            url: '/providers',
            template: '<providers-list></providers-list>'
        })
}