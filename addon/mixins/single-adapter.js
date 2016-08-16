import Ember from 'ember';

export default Ember.Mixin.create({
  _buildURL(modelName) {
    return this._super(modelName);
  }
});
