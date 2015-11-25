angular.module('starter.services', ['ngResource'])

.factory('Chokes', function($resource) {

  var chokes = $resource('https://shrouded-harbor-6203.herokuapp.com/api/chokes/');

  return {
    all: function() {
      return chokes;
    },
    get: function(chokeId) {
      for (var i = 0; i < chokes.length; i++) {
        if (chokes[i]._id === chokeId) {
          return chokes[i];
        }
      }
      return null;
    }
  };
})

.factory('Events', function($resource) {

  var temp = $resource('https://shrouded-harbor-6203.herokuapp.com/api/myEvents/');
  var events = temp['events'][0];

  return {
    all: function() {
      return events;
    },
    get: function(evId) {
      for (var i = 0; i < events.length; i++) {
        if (events[i].id === evId) {
          return events[i];
        }
      }
      return null;
    }
  };
});
