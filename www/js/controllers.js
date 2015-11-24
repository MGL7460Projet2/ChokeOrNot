angular.module('starter.controllers', [])

.controller('LoginCtrl', function($http,$state) {
    $http.get('https://shrouded-harbor-6203.herokuapp.com/api/auth/facebook').then(function(res) {
      if(res[content]  == "Autentication success !"){
        $state.go(tab.dash);
      }
    });
})

.controller('DashCtrl', function($scope, Chokes) {
    $scope.chokes = Chokes.all();
    //$http.get('https://shrouded-harbor-6203.herokuapp.com/api/auth/facebook');
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
