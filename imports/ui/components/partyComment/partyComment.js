import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';
import template from './partyComment.html';
import { Comments } from '../../../api/comments';

class PartyComment {
  constructor($scope, $reactive) {
    'ngInject';
    
    $reactive(this).attach($scope);
    
    this.comment = {};
    this.subscribe('comments');
    this.subscribe('users');
    
    
  }

  submit() {
    this.comment.creater = Meteor.user()._id;
    this.comment.createdAt = new Date();
    this.comment.event_Id = this.myAttr;
    this.comment.category = this.myCategory;
    
    Comments.insert(this.comment);

    if(this.done) {
      this.done();
    }

    this.reset();
  }

  reset() {
    this.comment = {};
  }
}

const name = 'partyComment';

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
  controller: PartyComment
});
