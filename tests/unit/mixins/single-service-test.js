import Ember from 'ember';
import SingleServiceMixin from 'ember-single/mixins/single-service';
import { module, test } from 'qunit';

module('Unit | Mixin | single service');

// Replace this with your real tests.
test('it works', function(assert) {
  let SingleServiceObject = Ember.Object.extend(SingleServiceMixin);
  let subject = SingleServiceObject.create();
  assert.ok(subject);
});
