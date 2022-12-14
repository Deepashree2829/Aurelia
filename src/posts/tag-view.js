import { inject } from 'aurelia-framework';
import { PostService } from '../common/services/post-service';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(PostService, EventAggregator)
export class TagView {
  constructor(PostService) {
    this.postService = PostService;
    this.eventAggregator = EventAggregator;
  }
  activate(params) {
    this.tag = params.tag;
    this.postService.postsByTag(this.tag).then((data) => {
        this.posts = data.posts;
    }).catch(error => {
      this.eventAggregator.publish('toast', {
        type: 'error',
        message: error.message
       })
    });
  }
}
