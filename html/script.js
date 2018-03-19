var app = angular.module("myShoppingList", ["ngRoute", "ui.bootstrap.datetimepicker"]); 

// App routes
app.config(function($routeProvider) {
  $routeProvider
    .when("/", {
    templateUrl : "sessions.htm"
  })
});
    
// Main controller 
app.controller("myCtrl", function($scope, $location, $http) {

  // 
  // Cofiguration
  // ====================

  // Configuration objects
  $scope.cfg = {
    order: {
      sessions: "",
    },
    filter: {
      sessions: {
        host: undefined,
        search: ""
      },
    },
    selected: {
      session: undefined,
    },
    new: {
      session: {}
    }
  };

  // Initial data retrieval
  $http.get("api1/poc/sessions")
    .then(function(response) {
      $scope.sessions = response.data;
  });

  // 
  // Functions
  // ====================

  // Data manipulation
  $scope.getData = function(resource) {
    var url = "api1/poc/" + resource;

    $http.get(url, config)
    .then(function(response) {
        $scope[resource] = response.data;
    });
  };
  $scope.postData = function(resource,data) {
    var url = "api1/poc/" + resource;

    $http.post(url, data, config)
    .then(function(response) {
        $scope.getData(resource);
    });
  };

  // Routing
  $scope.go = function (path) {
    $location.path(path);
  };
  $scope.isActive = function (viewLocation) { 
    return viewLocation === $location.path();
  };

  // Components manipulation
  $scope.selectSession = function (x){
    $scope.cfg.selected.session = x;
  };

  // Notifications
  $scope.notify = function (message,type){
    if(message && type) {
      $.notify({
        icon: 'pe-7s-gift',
        message: message

      },{
        type: type,
        timer: 4000
      });      
    }
    else {
      //Legacy
      $.notify({
            icon: 'pe-7s-gift',
            message: "You clicked something"

          },{
            type: 'info',
            timer: 4000
          });
    }
  };


console.log($scope.cfg);
});