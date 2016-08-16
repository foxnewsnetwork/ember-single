import { SingleModel } from 'ember-single';
import DS from 'ember-data';

export default DS.Model.extend({
  admin: DS.attr('boolean'),
  username: DS.attr('string')
}).reopenClass(SingleModel);
