import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import moment from 'moment';
import 'meteor/mrgalaxy:stripe';

import { Meteor } from 'meteor/meteor';

import template from './eventPayment.html';

import { Events } from '../../../api/events';

class EventPayment {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';

        this.$state = $state;
        this.$stateParams = $stateParams;
        $reactive(this).attach($scope);

        this.subscribe('events');

        this.error = '';
        this.payment = {};
        Session.set('EventID', this.myEvent._id);

        this.helpers({
            //
            timeLeft() {
                return moment(this.myEvent.createdAt).add(5, 'days').calendar();
            }
        });
    }
    payForAccount() {
        //event.preventDefault();

        var cardDetails = { // come from Stripe.js documentation
            "number": this.payment.cardNumber,
            "cvc": this.payment.cardCVC,
            "exp_month": this.payment.cardExpiryMM,
            "exp_year": this.payment.cardExpiryYY
        };

        Stripe.createToken(cardDetails, function(status, result) {
            if (result.error) {
                alert(result.error.message);
            } else {
                Meteor.call('chargeCard', result.id, function(err, response) {
                    if (err) {
                        alert(err.message);
                    } else {
                        console.log("EventID" + Session.get('EventID'));
                        Events.update({_id: Session.get('EventID')}, {$set: {"paid": true}});
                        alert('Thank you! You just got an unlimited access to your event!');
                    }
                })
            }
        })

        if(this.done) {
            this.done();
        }

    }



}



const name = 'eventPayment';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter
])
    .component(name, {
        template,
        bindings: {
            myEvent: '=',
            done: '&?'
        },
        controllerAs: name,
        controller: EventPayment
    });
