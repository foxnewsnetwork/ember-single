# Ember-single

Ember service based singleton pattern (use with ember-data!)

## HowTo: basic usage example
run the generator
```sh
ember generate singleton chatroom
```
This will create a `models/chatroom.js`, `services/chatroom.js`

Declare your `model/chatroom.js` as your would any run-of-the-mill regular DS.Model (notice `SingleModel` is mixed in for you):

```javascript
import DS from 'ember-data';
import { SingleModel } from 'ember-single';

const { attr, hasMany } = DS;

const Chatroom = DS.Model.extend(SingleModel, {
  topic: attr('string'),
  messages: hasMany('message),
  users: hasMany('user')
});
```
Your `services/chatroom.js` becomes the entry point to your singleton:

```javascript
Ember.Service.extend(SingleService, {
  modelFor: 'chatroom',

  modelPromise: computed(function() {
    // setup your model here
    // this is a computed function necessarily returns a promise
    // default implementation is as follows:
    return this.store.findRecord(this.get('modelFor'));
  })
});
```

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
