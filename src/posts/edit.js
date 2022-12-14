import { inject } from 'aurelia-framework';
import { PostService } from '../common/services/post-service';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(PostService, EventAggregator)

export class Edit {
  constructor(PostService) {
    this.postService = PostService;
    this.eventAggregator = EventAggregator;
  }
  activate(params) {
    this.title = 'Edit Post';
    this.postService.find(params.slug).then(data => {
      this.post = data.post;
    }).catch(error => {
      this.eventAggregator.publish('toast', {
        type: 'error',
        message: error.message
       })
    })
  }

  editPost() {
    this.postService.update(this.post).then((data) => {
      this.eventAggregator.publish('post-updated', Date())
      // this.router.navigateToRoute('post-edit', {slug: data.slug });
      this.router.navigateToRoute('home');
      this.eventAggregator.publish('toast', {
        type: 'success',
        message: 'Post updated!'
      })
    }).catch(error => {
      this.eventAggregator.publish('toast', {
        type: 'error',
        message: error.message
       })
    });
  }
}
