import nunjucks from 'nunjucks';
import cons from 'consolidate';
import getTemplateFns from './template-fns';

/**
 * Make some nunjucks
 * @param {Object} app Assemble instance
 * @param {Object} config gulp-boiler-config
 */
export default function(app, config) {
  const nunj = nunjucks.configure({
    watch: false,
    noCache: true
  });
  const templateFns = getTemplateFns(config);

  app.engine('.html', cons.nunjucks);

  app.data(templateFns);

  /**
   * Expose utility functions globally so they can
   * be used in the macro context
   */
  Object.keys(templateFns).forEach(name => {
    nunj.addGlobal(name, templateFns[name]);
  });

  return nunj;
}
