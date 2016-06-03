// Karin - start page when launching the website

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

import template from './startpage.html';
import { name as StartpageContent } from '../startpageContent/startpageContent';
import { name as EventList} from '../eventList/eventList';
import { name as PartyCategory } from '../partyCategory/partyCategory';
import { name as Navigation } from '../navigation/navigation';
import { name as UserAuth} from '../userAuth/userAuth';

class Startpage {}

const name = 'startpage';


export default angular.module(name, [
  angularMeteor,
  ngMaterial,
  uiRouter,
  StartpageContent,
  EventList,
  Navigation,
  UserAuth,
  PartyCategory,
  'accounts.ui'   // Karin: user accounts - delete if not necessary!!
]).component(name, {
  template,
  controllerAs: name,
  controller: Startpage
})
  .config(config)
  .run(run);

function config($locationProvider, $urlRouterProvider, $mdIconProvider) {
  'ngInject';

//Karin:  set "start" (short for start page) as default
  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/start');

  //Karin: delete icons later when not in use
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
      iconPath + 'svg-sprite-image.svg');
}

function run($rootScope, $state) {
  'ngInject';

  $rootScope.$on('$stateChangeError',
    (event, toState, toParams, fromState, fromParams, error) => {
      if (error === 'AUTH_REQUIRED') {
        $state.go('start');
      }
    }
  );
}
