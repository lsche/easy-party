import angular from 'angular';
import angularMeteor from 'angular-meteor';
import moment from 'moment';


import { Meteor } from 'meteor/meteor';
import template from './partyComment.html';
import { Comments } from '../../../api/comments';

class PartyComment {
  constructor($scope, $reactive, $stateParams) {
    'ngInject';
    
    $reactive(this).attach($scope);

    $scope.parseDate = function(jsonDate) {
      //date parsing functionality
      return moment(jsonDate).format('DD-MM-YYYY');;
    };
    
    this.subscribe('comments');
    this.subscribe('users');

    this.showAddForm = false;
    this.comment = {};

    this.helpers({
      commentslist() {
        return Comments.find({ event_Id: $stateParams.eventId, category: $stateParams.categoryName });
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
      this.comment = {};
      this.showAddForm = false;
    } else {
      this.showAddForm = true;
    }
  }

  submit() {
    this.comment.creater = Meteor.user()._id;
    this.comment.createdAt = new Date();
    this.comment.event_Id = this.myAttr;
    this.comment.category = this.myCategory;
    
    Comments.insert(this.comment);

    this.comment = {};
    this.showAddForm = false;
  }

}

const name = 'partyComment';

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
  controller: PartyComment
});
