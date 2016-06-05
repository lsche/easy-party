import angular from 'angular';
import angularMeteor from 'angular-meteor';
import moment from 'moment';

import { Meteor } from 'meteor/meteor';
import template from './partyNotes.html';
import { Notes } from '../../../api/notes';

class PartyNotes {
  constructor($scope, $reactive, $stateParams) {
    'ngInject';
    
    $reactive(this).attach($scope);

    this.showAddForm = false;
    this.note = {};
    this.subscribe('notes');
    this.subscribe('users');

    this.helpers({
      noteslist() {
        return Notes.find({ event_Id: $stateParams.eventId, category: $stateParams.categoryName });
      },
      eventId() {
        return $stateParams.eventId;
      },
      categoryName() {
        return $stateParams.categoryName;
      }
    });
  }
  openForm() {
    if(this.showAddForm) {
      this.note = {};
      this.showAddForm = false;
    } else {
      this.showAddForm = true;
    }
  }

  submit() {
    this.note.creater = Meteor.user()._id;
    this.note.createdAt = new Date();
    this.note.event_Id = this.myAttr;
    this.note.category = this.myCategory;
    
    Notes.insert(this.note);

    this.note = {};
    this.showAddForm = false;
  }
}

const name = 'partyNotes';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  bindings: {
    myAttr: '=',
    myCategory: '='
  },
  controllerAs: name,
  controller: PartyNotes
});
