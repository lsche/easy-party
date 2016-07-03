import angular from 'angular';
import angularMeteor from 'angular-meteor';
import Chart from 'chart.js'

import { Meteor } from 'meteor/meteor';

import template from './pieChart.html';

import { Guests } from '../../../api/guests';
import { Events } from '../../../api/events';

class PieChart {
    constructor($stateParams, $scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);


        this.subscribe('events');
        this.subscribe('users');
        this.subscribe('guests', function(){
            $scope.notInvited = 0;
            Guests.find({event_Id: this.myAttr, status: "Not Invited yet"}).forEach(function(guest){
                $scope.notInvited = $scope.notInvited + guest.number;
            });
            $scope.invited = 0;
            Guests.find({event_Id: this.myAttr, status: "Invited"}).forEach(function(guest){
                $scope.invited = $scope.invited + guest.number;
            });
            $scope.attending = 0;
            Guests.find({event_Id: this.myAttr, status: "Attending"}).forEach(function(guest){
                $scope.attending = $scope.attending + guest.number;
            });
            $scope.notAttending = 0;
            Guests.find({event_Id: this.myAttr, status: "Not Attending"}).forEach(function(guest){
                $scope.notAttending = $scope.notAttending + guest.number;
            });
            var ctx = document.getElementById("myPieChart");
            var data = [$scope.notInvited, $scope.invited, $scope.attending, $scope.notAttending];

            var myPieChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: [
                        "Not Invited yet",
                        "Invited",
                        "Attending",
                        "Not Attending"
                    ],
                    datasets: [
                        {
                            data: data,
                            backgroundColor: [
                                "#006064",
                                "#0097A7",
                                "#00BCD4",
                                "#80DEEA"
                            ],
                            hoverBackgroundColor: [
                                "#006064",
                                "#0097A7",
                                "#00BCD4",
                                "#80DEEA"
                            ]
                        }]
                },
                options: {
                    legend: {
                        display: true,
                        labels: {
                            boxWidth: 30,
                            fontColor: 'grey'
                        },
                        position: 'bottom',
                        fullWidth: false,

                    },
                    title: {
                        display: true,
                        text: 'Overview',
                        fontSize: 20,
                        padding: 15
                    }
                }
            });
        });



        this.helpers({});
    }
}

const name = 'pieChart';

// create a module
export default angular.module(name, [
    angularMeteor
]).component(name, {
    template,
    bindings: {
        myAttr: '='
    },
    controllerAs: name,
    controller: PieChart
});


