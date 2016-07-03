import angular from 'angular';

import { Meteor } from 'meteor/meteor';
import 'meteor/mrgalaxy:stripe';

import { name as Startpage } from '../imports/ui/components/startpage/startpage';

function onReady() {
  angular.bootstrap(document, [
    Startpage
  ], {
    strictDi: true
  });
}

Meteor.startup(function() {
    Stripe.setPublishableKey(Meteor.settings.public.StripePub);
});

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
