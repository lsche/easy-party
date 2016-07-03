import angular from 'angular';
import angularMeteor from 'angular-meteor';
import moment from 'moment';

import { Meteor } from 'meteor/meteor';
import template from './partyNotes.html';
import modalBuffetTemplate from './buffetListModal.html';
import { Notes } from '../../../api/notes';
import { name as BuffetList } from '../buffetList/buffetList';

class PartyNotes {
  constructor($scope, $reactive, $stateParams, $mdDialog, $mdMedia) {
    'ngInject';
    
    $reactive(this).attach($scope);

    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia;

    this.showAddForm = false;
    this.note = {};
    this.currentNote = null;
    this.subscribe('notes');
    this.subscribe('users');
    this.eventId = $stateParams.eventId;

    this.helpers({
      noteslist() {
        return Notes.find({ event_Id: $stateParams.eventId, category: $stateParams.categoryName },{sort: {createdAt: -1}});
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


  openBuffetList(eventID) {
    console.log(eventID);
      this.$mdDialog.show({
      controller($mdDialog, $scope) {
        'ngInject';

        $scope.event = eventID;

        this.close = () => {
          $mdDialog.hide();
        }
      },
      controllerAs: 'buffetListModal',
      template: modalBuffetTemplate,
      targetEvent: event,
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: this.$mdMedia('sm') || this.$mdMedia('xs')
    });
  }

  enterNote(note){
    this.currentNote = note._id;
  }

  leaveNote(){
    this.currentNote = null;
  }

  deleteNote(note){
    Notes.remove(note._id);
  }

}


const name = 'partyNotes';

// create a module
export default angular.module(name, [
    angularMeteor,
    BuffetList
]).component(name, {
  template,
  bindings: {
    myAttr: '=',
    myCategory: '='
  },
  controllerAs: name,
  controller: PartyNotes
});
