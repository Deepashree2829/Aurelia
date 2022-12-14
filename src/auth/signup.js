import { AuthService } from "../common/services/auth-service";
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator, Router, AuthService)
export class Signup {
  constructor(EventAggregator, Router, AuthService) {
    this.eventAggregator = EventAggregator;
    this.router = Router;
    this.authService = AuthService;
  }
  signUp() {
    this.authService.signup(this.name).then(data => {
      this.eventAggregator.publish('user', data.name);
      this.router.navigateToRoute('home');
      console.log(data.user);
    }).catch(error => {
      this.eventAggregator.publish('toast', {
        type: 'error',
        message: error.message
       })
    })
  }
}
