import { PostService } from "../common/services/post-service";
import { AuthService } from "../common/services/auth-service";
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(PostService, EventAggregator, AuthService)
export class View {
  constructor(PostService) {
    this.postService = PostService;
    this.authService = AuthService;
    this.eventAggregator = EventAggregator;
  }
  activate(params) {
    this.error = '';
    this.postService.find(params.slug).then((data) => {
        this.post = data.post;
    }).catch(error => {
      this.eventAggregator.publish('toast', {
        type: 'error',
        message: error.message
       })
    });
  }
}
