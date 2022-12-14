import {bindable} from 'aurelia-framework';
import { PostService } from '../../common/services/post-service';
import { inject } from 'aurelia-framework';
import { ValidationRules, ValidationControllerFactory, validationMessages } from 'aurelia-validation';

@inject(PostService, ValidationControllerFactory, ValidationRules)
export class PostForm {
  @bindable post;
  @bindable title;
  constructor(PostService, ValidationControllerFactory) {
    this.controller = ValidationControllerFactory.createForCurrentScope();
    this.postService = PostService;
  }
  submit() {

  }
  addTag() {
    this.allTags.push(this.newTag);
    this.post.tags.push(this.newTag);
    this.newTag = '';
  }
  attached() {
    this.postService.allTags().then(data => {
      this.allTags = data.tags;
    }).catch(error => {
      this.eventAggregator.publish('toast', {
        type: 'error',
        message: error.message
       })
    })
  }
  postChanged(newValue, oldValue) {
    if(this.post) {
      validationMessages['required'] = `You must enter a \${$displayName}`;
      ValidationRules
        .ensure('title').displayName('Title').required().minLength(5)  
        .ensure('body').displayName('Body').required()
        .on(this.post);
        this.controller.validate();
    }
  }
}
