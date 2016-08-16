import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | singleton');

test('we should be able to use a singleton model / service architecture', function(assert) {
  const { container } = this.application;

  visit('/');

  andThen(() => {
    const appCtrl = container.lookup('controller:application');
    const session = appCtrl.get('model');

    assert.ok(session, 'the session should be there');
    assert.equal(session.get('admin'), false, 'we should not be the admin');
    assert.equal(session.get('username'), 'xXxSSJVegetaXxX', 'the right stuff should be serialized');
  });
});
