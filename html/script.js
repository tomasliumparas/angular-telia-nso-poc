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

  // 
  // Functions
  // ====================

  // Data manipulation
  $scope.getData = function(resource) {
    var url = "api1/poc/" + resource;

    $http.get(url)
    .then(function(response) {
        $scope[resource] = response.data;

        // Store last resource element
        $scope.last = response.data[response.data.length -1];
    });
  };
  $scope.postData = function(resource,data) {
    var url = "api1/poc/" + resource;

    $http.post(url, data)
    .then(function(response) {
        $scope.getData(resource);
    });
  };

  // Initial data retrieval
  $scope.getData('sessions');

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