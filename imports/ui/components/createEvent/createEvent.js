import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './createEvent.html';
import { Events } from '../../../api/events';

class CreateEvent {
  constructor() {
    this.event = {};
  }

  submit() {
    this.event.owner = Meteor.user()._id;
    Events.insert(this.event);

    if(this.done) {
      this.done();
    }

    this.reset();
  }

  reset() {
    this.event = {};
  }
}

const name = 'createEvent';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  bindings: {
    done: '&?'
  },
  controllerAs: name,
  controller: CreateEvent
});
