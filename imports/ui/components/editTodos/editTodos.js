import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

import template from './editTodos.html';


import { Todos } from '../../../api/todos';

class EditTodos {
    constructor($scope, $reactive, $state) {
        'ngInject';

        this.$state = $state;
        $reactive(this).attach($scope);

        this.error = '';
    }
}

const name = 'editTodos';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter
])
    .component(name, {
        template,
        bindings: {
            myTask: '='
        },
        controllerAs: name,
        controller: EditTodos
    });
