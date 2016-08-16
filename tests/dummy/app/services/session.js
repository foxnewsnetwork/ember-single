import { SingleService } from 'ember-single';
import Ember from 'ember';

export default Ember.Service.extend(SingleService, {
  modelName: 'session'
});
