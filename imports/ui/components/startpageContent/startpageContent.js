// Karin - backend for content of start page

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './startpageContent.html';
import { Parties } from '../../../api/parties';


class StartpageContent {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.helpers({
      parties() {
        return Parties.find({});
      }
    });
  }
}

const name = 'startpageContent';


export default angular.module(name, [
  angularMeteor,
  uiRouter
]).component(name, {
  template,
  controllerAs: name,
  controller: StartpageContent
})
  .config(config);

function config($stateProvider, $mdThemingProvider) {
  'ngInject';
  $stateProvider
    .state('start', {
      url: '/start',
      template: '<startpage-content></startpage-content>'
    }),
      // define cyan-theme -> color of the logo
    $mdThemingProvider.theme('default')
        .primaryPalette('cyan')
        .accentPalette('red', {
            'default': '900'
        });
}
