  import Ember from 'ember';

const { computed, inject: { service } } = Ember;

export default Ember.Mixin.create({
  store: service('store'),

  modelName: null,

  modelPromise: computed(function() {
    const { store, modelName } = this.getProperties('store', 'modelName');

    return store.findRecord(modelName);
  })
});
