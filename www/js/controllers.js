angular.module('starter.controllers', ['starter.services'])

.controller('DashCtrl', function($scope, Chokes) {
  $scope.chokes = Chokes.all();
})

.controller('ChokeDetailCtrl', function($scope, $stateParams, Chokes) {
  $scope.choke = Chokes.get($stateParams.chokeId);
})

.controller('EventsCtrl', function($scope, Events) {
  $scope.events = Events.all();
})

.controller('EventDetailCtrl', function($scope, $stateParams, Events) {
  $scope.ev = Events.get($stateParams.evId);
});
