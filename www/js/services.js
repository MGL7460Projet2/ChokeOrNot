angular.module('starter.services', [])
.factory('Credentials', function(){
  //Here to stock id & access token
  var credentials = {
    id : "",
    token : ""
  }

  return({
    set : function(id, token){
        credentials.id = id;
        credentials.token = token;
    },
    get : function(){
      return credentials;
    }
  });
})

.factory('Chokes', function($http) {
  // Might use a resource here that returns a JSON array
  var mychokes = [];

  return {
    all: function() {
      return mychokes;
    },
    get: function(chokeId) {
      for (var i = 0; i < mychokes.length; i++) {
        if (mychokes[i].id === (chokeId)) {
          return mychokes[i];
        }
      }
      return null;
    },
    set : function(data){
      console.log("Chokes setting starts now");

      for(i in data){
        mychokes.push({
          id : data[i]._id,
          sender : data[i].fbSender,
          receiver: data[i].fbReceiver,
          event : data[i].event,
          answered : data[i].answered,
          response : data[i].response,
          face : 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
        });
      }
      console.log("Chokes set");
    },
    clear : function(){
      mychokes = [];
    },
    add : function(choke){
      mychokes.push(choke);
    },
    updateResponse : function(chokeID, res){
      for(i in mychokes){
        if(mychokes[i].id == chokeID){
          mychokes[i].answered = true;
          mychokes[i].response = res;
        }
      }
    }
  };
})

.factory('Events', function() {
  // Might use a resource here that returns a JSON array
  var myEvents = [];

  return {
    all: function(){
          return myEvents;
    },
    get: function(evId) {
      for (var i = 0; i < myEvents.length; i++) {
        if (myEvents[i].id === evId) {
          return myEvents[i];
        }
      }
      // In case of error, sends this
      return {
          id : 0,
          name : "failed to load events",
          lastText : "Looks like you're not connected to internet, try when you got a connection or reload the tab",
          startTime : ""
      };
    },
    set : function(data){
      console.log("Data Setting starts now");

      for(i in data.events){
        myEvents.push({
          id : data.events[i].id,
          name : data.events[i].name,
          lastText : data.events[i].description,
          startTime : data.events[i]['start time'],
          face : 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
        });
      }
      console.log("Data set");


    }
  };

})

.factory('EventUsers', function() {
  // Might use a resource here that returns a JSON array
  var eventUsers = [];

  return {
    all: function(){
          return eventUsers;
    },
    get: function(evId) {
      for (var i = 0; i < eventUsers.length; i++) {
        if (eventUsers[i].id === evId) {
          return eventUsers[i];
        }
      }
      // In case of error, sends this
      return {
          id : 0,
          name : "failed to load events",
          lastText : "Looks like you're not connected to internet, try when you got a connection or reload the tab",
          startTime : ""
      };
    },
    set : function(data){
      console.log("Event users setting starts now");

      for(i in data){
        eventUsers.push({
          id : data[i].id,
          name : data[i].name,
          face : 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
        });
      }
      console.log("Event users set");
    },
    clear : function(){
      eventUsers = [];
    }
  };
});
