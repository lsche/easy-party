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

    $scope.getName = function(userId){
      var user = Meteor.users.findOne({_id: userId});
      if(user){
        return user.profile.firstName;
      } else{
        return "no name";
      }
    };
    
    $scope.getColor = function(userId){
      var user = Meteor.users.findOne({_id: userId});
      if(user){
        return user.profile.color;
      } else{
        return "no name";
      }
    };
    
    this.subscribe('comments');
    this.subscribe('users');

    this.showAddForm = false;
    this.comment = {};
    this.categoryName = $stateParams.categoryName.charAt(0).toUpperCase() + $stateParams.categoryName.slice(1);

    this.helpers({
      commentslist() {
        return Comments.find({ event_Id: $stateParams.eventId, category: $stateParams.categoryName });
      },
      eventId() {
        return $stateParams.eventId;
      },
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
