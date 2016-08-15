import Ember from 'ember';
import SingleModelMixin from 'ember-single/mixins/single-model';
import { module, test } from 'qunit';

module('Unit | Mixin | single model');

// Replace this with your real tests.
test('it works', function(assert) {
  let SingleModelObject = Ember.Object.extend(SingleModelMixin);
  let subject = SingleModelObject.create();
  assert.ok(subject);
});
