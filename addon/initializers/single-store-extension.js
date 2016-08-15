import DS from 'ember-data';
import isSingleton from '../utils/is-singleton';

export function initialize(/* application */) {
  DS.Store.reopen({
    findRecord(modelName, id, options) {
      if (isSingleton(this, modelName)) {
        return this._super(modelName, 'SINGLETON', options);
      }
      return this._super(modelName, id, options);
    }
  });
}

export default {
  name: 'single-store-extension',
  initialize
};
