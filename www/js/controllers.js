angular.module('starter.controllers', [])

.controller('LoginCtrl', function($http,$state, $scope, Events, Chokes, Credentials) {

    /*  FACEBOOK IDENTIFICATION  */
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '1093913377287097',
        xfbml      : true,
        version    : 'v2.5'
      });

      FB.login(function(response) {
        // handle the response
        //console.log(response);
        if (response.authResponse) {

          accessToken = response.authResponse.accessToken;
          userID = response.authResponse.userID;
          Credentials.set(userID, accessToken);

          var myEvents = [];
          var loaded = false;

          // GET Request in native JavaScript
          var uri = 'https://shrouded-harbor-6203.herokuapp.com/api/myinfos/'+userID+'/'+accessToken;
          console.log("GET TO : "+uri);

          var xhr = new XMLHttpRequest();
          xhr.open('GET', encodeURI(uri));
          xhr.onload = function() {
              if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                console.log(data);
                console.log("Now we're logged in with Facebook, time to set Events locally");
                // GET Request in native JavaScript
                  var uri2 = 'https://shrouded-harbor-6203.herokuapp.com/api/myEvents/'+userID;
                  var xhr2 = new XMLHttpRequest();
                  xhr2.open('GET', encodeURI(uri2));
                  xhr2.onload = function() {
                      if (xhr2.status === 200) {
                        var data2 = JSON.parse(xhr2.responseText);
                        console.log("Events : ");
                        console.log(data2);
                        Events.set(data2);
                        console.log(Events.all());
                        // GET Request in native JavaScript
                          var uri3 = 'https://shrouded-harbor-6203.herokuapp.com/api/chokes/'+userID;
                          var xhr3 = new XMLHttpRequest();
                          xhr3.open('GET', encodeURI(uri3));
                          xhr3.onload = function() {
                              if (xhr3.status === 200) {
                                var data3 = JSON.parse(xhr3.responseText);
                                console.log("Chokes : ");
                                console.log(data3);
                                Chokes.set(data3);
                                console.log(Chokes.all());
                                $state.go('tab.dash');

                              //  console.log(data.events);
                              }
                              else {
                                  console.log('Request failed.  Returned status of ' + xhr3.status);
                                  return "err";

                              }
                          };
                          xhr3.send();

                      //  console.log(data.events);
                      }
                      else {
                          console.log('Request failed.  Returned status of ' + xhr2.status);
                          return "err";
                      }
                  };
                  xhr2.send();
              }
              else {
                  console.log('Request failed.  Returned status of ' + xhr.status);
              }
          };
          xhr.send();
        }
      }, {scope: 'email,user_likes,user_events', return_scopes: true});


    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));


})

.controller('DashCtrl', function($scope, $state, Chokes,Events, Credentials) {
    $scope.chokes = Chokes.all();

    //$http.get('https://shrouded-harbor-6203.herokuapp.com/api/auth/facebook');
})

.controller('ChokeDetailCtrl', function($scope, $state, $stateParams, Chokes, Credentials) {
  $scope.choke = Chokes.get($stateParams.chokeId);
  var credentials = Credentials.get();
  $scope.show = function(idReceiver){
    if($scope.choke.answered === true){
      //Déjà répondu, donc on enlève les boutons de réponse
      return false;
    }else{
      if(idReceiver === credentials.id){
        //L'utilisateur est le receveur, donc il peut répondre : on affiche les boutons
        return true;
      }else{
        //L'utilisateur est l'envoyeur, donc on cache les boutons
        return false;
      }
    }

  };

  $scope.yes = function(){
    console.log("Respond YES");
    // GET Request in native JavaScript to accept Choke
      var uri = 'https://shrouded-harbor-6203.herokuapp.com/api/respond/'+$stateParams.chokeId+'/'+credentials.id;
      var xhr = new XMLHttpRequest();
      xhr.open('GET', encodeURI(uri));
      xhr.onload = function() {
          if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            console.log("Choke responded YES");
            console.log(data);
            Chokes.updateResponse($stateParams.chokeId, data.response);
          }
          else {
              console.log('Request failed.  Returned status of ' + xhr.status);
              return "err";
          }
      };
      xhr.send();
  }

  $scope.no = function(){
    console.log("Respond NO");
    // GET Request in native JavaScript to refuse Choke
      var uri = 'https://shrouded-harbor-6203.herokuapp.com/api/decline/'+$stateParams.chokeId+'/'+credentials.id;
      var xhr = new XMLHttpRequest();
      xhr.open('GET', encodeURI(uri));
      xhr.onload = function() {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          console.log("Choke responded NO");
          console.log(data);
          Chokes.updateResponse($stateParams.chokeId, data.response);
        }
          else {
              console.log('Request failed.  Returned status of ' + xhr.status);
              return "err";
          }
      };
      xhr.send();

  }

})

.controller('EventsCtrl', function($scope, Events) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  $scope.$on('$ionicView.enter', function(e) {
    //console.log(Events.all());
      $scope.events = Events.all();
  });
})

.controller('EventDetailCtrl', function($scope, $stateParams, Events, EventUsers, Credentials) {
  $scope.ev = Events.get($stateParams.evId);
  var credentials = Credentials.get();
  // GET Request in native JavaScript to get participants
    var uri = 'https://shrouded-harbor-6203.herokuapp.com/api/event/attending/'+$stateParams.evId+'/'+credentials.id;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', encodeURI(uri));
    xhr.onload = function() {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          var users = [];
          console.log(data);
          for(i in data.data){
            console.log(data.data[i]);
            users.push(data.data[i]);
          }
          EventUsers.clear();
          EventUsers.set(users);
        //  console.log(data.events);
        }
        else {
            console.log('Request failed.  Returned status of ' + xhr.status);
            return "err";
        }
    };
    xhr.send();
})

.controller('EventUsersCtrl', function($scope, $state, $stateParams, Events, EventUsers, Chokes, Credentials) {
  $scope.ev = Events.get($stateParams.evId);
  $scope.users = EventUsers.all();

  var credentials = Credentials.get();

  $scope.choke = function(id){
    // console.log("ADD CHOKE : "+ id);
    // console.log("ID  : " +credentials.id);
    // console.log("Event : "+$stateParams.evId);

    // GET Request in native JavaScript to get participants
      var uri = 'https://shrouded-harbor-6203.herokuapp.com/api/choke/'+id+'/'+credentials.id+'/'+$stateParams.evId;
      var xhr = new XMLHttpRequest();
      xhr.open('GET', encodeURI(uri));
      xhr.onload = function() {
          if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            console.log(data);
            Chokes.add({
                id : data._id,
                sender : data.fbSender,
                receiver: data.fbReceiver,
                event : data.event,
                answered : data.answered,
                response : data.response,
                face : 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
            });
          //  console.log(data.events);
          }
          else {
              console.log('Request failed.  Returned status of ' + xhr.status);
              return "err";
          }
      };
      xhr.send();
  }
})
;
