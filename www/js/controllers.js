angular.module('starter.controllers', ['starter.services'])

.controller('DashCtrl', function($scope, Chokes) {
    $scope.chokes = Chokes.all();
})

.controller('ChokeDetailCtrl', function($scope, $stateParams, Chokes) {
  $scope.choke = Chokes.get($stateParams.chokeId);
})

.controller('EventsCtrl', function($scope, Events) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.events = Events.all();
})

.controller('EventDetailCtrl', function($scope, $stateParams, Events) {
  $scope.ev = Events.get($stateParams.evId);
});
