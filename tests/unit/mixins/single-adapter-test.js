import Ember from 'ember';
import SingleAdapterMixin from 'ember-single/mixins/single-adapter';
import { module, test } from 'qunit';

module('Unit | Mixin | single adapter');

// Replace this with your real tests.
test('it works', function(assert) {
  let SingleAdapterObject = Ember.Object.extend(SingleAdapterMixin);
  let subject = SingleAdapterObject.create();
  assert.ok(subject);
});
