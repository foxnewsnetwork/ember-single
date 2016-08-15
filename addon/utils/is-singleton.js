import Ember from 'ember';

export default function isSingleton(store, modelName) {
  const modelClass = store.modelFor(model);
  return Ember.getWithDefault(modelClass, 'isSingleton', false);
}
