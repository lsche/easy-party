// Karin - backend for content of start page

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';

import template from './startpageContent.html';



class StartpageContent {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.helpers({
      
    });
  }
}

const name = 'startpageContent';


export default angular.module(name, [
  angularMeteor,
    ngMaterial,
  uiRouter
]).component(name, {
  template,
  controllerAs: name,
  controller: StartpageContent
})
  .config(config);

function config($stateProvider, $mdThemingProvider, $mdIconProvider) {
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

  const iconPath =  '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/';

  $mdIconProvider
      .iconSet('social',
          iconPath + 'svg-sprite-social.svg')
      .iconSet('action',
          iconPath + 'svg-sprite-action.svg')
      .iconSet('communication',
          iconPath + 'svg-sprite-communication.svg')
      .iconSet('content',
          iconPath + 'svg-sprite-content.svg')
      .iconSet('toggle',
          iconPath + 'svg-sprite-toggle.svg')
      .iconSet('navigation',
          iconPath + 'svg-sprite-navigation.svg')
      .iconSet('image',
          iconPath + 'svg-sprite-image.svg')
      .iconSet('maps',
          iconPath + 'svg-sprite-maps.svg');

}
