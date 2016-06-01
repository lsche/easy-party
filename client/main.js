import angular from 'angular';

import { Meteor } from 'meteor/meteor';

import { name as Startpage } from '../imports/ui/components/startpage/startpage';

function onReady() {
  angular.bootstrap(document, [
    Startpage
  ], {
    strictDi: true
  });
}

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
