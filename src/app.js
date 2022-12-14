import { PLATFORM } from 'aurelia-pal';
import { PostService } from "common/services/post-service";
import { AuthService } from "common/services/auth-service";
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
// import { AuthorizeStep } from './pipelinesteps/authorize-step';
import 'toastr/build/toastr.css';
import * as toastr from 'toastr';
// import { I18N } from 'aurelia-i18n';

@inject(EventAggregator,AuthService,PostService)
export class App {
  constructor(EventAggregator, AuthService, PostService) {
    this.eventAggregator = EventAggregator;
    this.authService = AuthService;
    this.postService = PostService;
    // this.i18n = I18N;
  }
  attached() {
    this.currentUser = this.authService.currentUser;
    this.subscription = this.eventAggregator.subscribe('user', user => {
      this.currentUser = this.authService.currentUser;
    });
   this.updateSidebar();
   this.postSubscription = this.eventAggregator.subscribe('post-updated',updatedAt => {
    this.updateSidebar();
   })
   this.toastSubscription = this.eventAggregator.subscribe('toast', toast => {
    toastr[toast.type](toast.message);
   })
  }
  updateSidebar() {
    this.postService.allTags().then((data) => {
      this.tags = data.tags;
    }).catch(error => {
      this.eventAggregator.publish('toast', {
        type: 'error',
        message: error.message
       })
    });
    this.postService.allArchives().then((data) => {
      this.archives = data.archives;
    }).catch(error => {
      this.eventAggregator.publish('toast', {
        type: 'error',
        message: error.message
       })
    });
  }
  configureRouter(config, router) {
    this.router = router;
    config.title  = 'Blog!';
    // config.addAuthorizeStep(AuthorizeStep);
    config.map([
      {route: '', name: 'home',  moduleId: PLATFORM.moduleName('posts/index'), title: 'All Posts'},
      {route: 'login', name: 'login',  moduleId: PLATFORM.moduleName('auth/login'), title: 'Log In'},
      {route: 'signup', name: 'signup',  moduleId: PLATFORM.moduleName('auth/signup'), title: 'Sign Up'},
      {route: 'create', name: 'create',  moduleId: PLATFORM.moduleName('posts/create'), title: 'New Post'},
      {route: 'post/:slug', name: 'post-view',  moduleId: PLATFORM.moduleName('posts/view'), title: 'View Post'},
      {route: 'post/:slug/edit', name: 'post-edit',  moduleId: PLATFORM.moduleName('posts/edit'), title: 'Edit Post'},
      {route: 'tag/:tag', name: 'tag-view',  moduleId: PLATFORM.moduleName('posts/tag-view'), title: 'View Post by Tag'},
      {route: 'archive/:archive', name: 'archive-view',  moduleId: PLATFORM.moduleName('posts/archive-view'), title: 'View Post by Archive'}
    ])
  }
  detached() {
    this.subscription.dispose();
    this.postSubscription.dispose();
    this.toastSubscription.dispose();
  }
  logout() {
    this.authService.logout().then(data => {
     this.eventAggregator.publish('user',null);
     this.router.navigateToRoute('home');
     this.eventAggregator.publish('toast', {
      type: 'success',
      message: 'You have successfully logged out'
     })
    }).catch((error) => {
      this.eventAggregator.publish('toast', {
        type: 'error',
        message: error.message
       })
    })
  }
  setLocale(locale) {
    this.i18n.setLocale(locale);
  }
}
