angular.module('starter.services', ['ngResource'])

.factory('Chokes', function($resource) {

  var chokes =  $resource('http://localhost:3000/api/chokes');

  return {
    all: function() {
      return chokes;
    },
    get: function(chokeId) {
      for (var i = 0; i < chokes.length; i++) {
        if (chokes[i].id === parseInt(chokeId)) {
          return chokes[i];
        }
      }
      return null;
    }
  };
})

.factory('Events', function($ressource) {

  var events = $resource('http://localhost:3000/api/myEvents');
  console.log(events);
  return {
    all: function() {
      return events;
    },
    get: function(evId) {
      for (var i = 0; i < events.length; i++) {
        if (events[i].id === parseInt(evId)) {
          return events[i];
        }
      }
      return null;
    }
  };
});
