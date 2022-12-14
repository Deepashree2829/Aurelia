import environment from '../config/environment.json';
import {PLATFORM} from 'aurelia-pal';
import "assets/styles/blog.css";
// import { Backend } from 'aurelia-i18n';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'))
    .plugin(PLATFORM.moduleName('aurelia-validation'))
    // .plugin('aurelia-i18n', instance => {
    //   instance.i18next.use(Backend.with(aurelia.loader));
    //   return instance.setup({
    //     backend: {
    //       loadPath: './locales/{{lng}}/{{ns}}.json'
    //     },
    //     lng: 'en-ca',
    //     fallback: 'french',
    //     ns: ['nav', 'post-form'],
    //     debug: false
    //   });
    // })

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
