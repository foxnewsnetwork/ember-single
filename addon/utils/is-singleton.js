import Ember from 'ember';

export default function isSingleton(store, modelName) {
  const modelClass = store.modelFor(modelName);
  return Ember.getWithDefault(modelClass, 'isSingleton', false);
}
