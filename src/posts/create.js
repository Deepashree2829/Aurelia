import { inject } from 'aurelia-framework';
import { PostService } from '../common/services/post-service';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(PostService, EventAggregator)

export class Create {
  constructor(PostService) {
    this.postService = PostService;
    this.eventAggregator = EventAggregator;
  }
  attached() {
    this.post = {
      title: '',
      body: '',
      tags: []
    };
    this.title = 'Create Post';
  }

  createPost() {
    this.postService.create(this.post).then((data) => {
      this.eventAggregator.publish('post-updated', Date())
      this.router.navigateToRoute('home');
      // this.router.navigateToRoute('post-view', {slug: data.slug });
      this.eventAggregator.publish('toast', {
        type: 'success',
        message: 'Post created!'
      })
    }).catch(error => {
      this.eventAggregator.publish('toast', {
        type: 'error',
        message: error.message
       })
    });
  }
}
