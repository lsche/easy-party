/**
 * Created by louisa on 29.05.16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import template from './todosList.html';

class TodosListCtrl {
    constructor() {
        this.tasks = [{
            text: 'This is task 1'
        }, {
            text: 'This is task 2'
        }, {
            text: 'This is task 3'
        }];
    }
}

export default angular.module('todosList', [
    angularMeteor,
    ngMaterial
])
    .component('todosList', {
        templateUrl: 'imports/components/todosList/todosList.html',
        controller: TodosListCtrl
    });