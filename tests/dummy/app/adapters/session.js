import { SingleAdapter } from 'ember-single';
import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend(SingleAdapter, {
  namespace: 'api'
});
