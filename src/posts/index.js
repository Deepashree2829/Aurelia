import { PostService } from "../common/services/post-service";
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(PostService, EventAggregator)
export class Index {
  constructor(PostService) {
    this.postService = PostService;
    this.eventAggregator = EventAggregator;
  }
  attached() {
    this.postService.allPostPreviews().then((data) => {
      this.posts = data.posts;
    }).catch(error => {
      this.eventAggregator.publish('toast', {
        type: 'error',
        message: error.message
       })
    });
  }
}
