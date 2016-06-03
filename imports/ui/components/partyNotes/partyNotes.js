import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';
import template from './partyNotes.html';
import { Notes } from '../../../api/notes';

class PartyNotes {
  constructor($scope, $reactive) {
    'ngInject';
    
    $reactive(this).attach($scope);
    
    this.note = {};
    this.subscribe('notes');
    this.subscribe('users');
    
    
  }

  submit() {
    this.note.creater = Meteor.user()._id;
    this.note.createdAt = new Date();
    this.note.event_Id = this.myAttr;
    this.note.category = this.myCategory;
    
    Notes.insert(this.note);

    if(this.done) {
      this.done();
    }

    this.reset();
  }

  reset() {
    this.note = {};
  }
}

const name = 'partyNotes';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  bindings: {
    done: '&?',
    myAttr: '=',
    myCategory: '='
  },
  controllerAs: name,
  controller: PartyNotes
});
