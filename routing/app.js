(function() {
    
    var app = angular.module("routeApp", ['ngRoute']);
    
    app.config(["$routeProvider", function($routeProvider) {
        
        $routeProvider
            
            .when("/", {
            
            templateUrl: "home.html",
            controller: "homeCtrl"
        })
            .when("/about", {
            
                templateUrl: "hello.html",
                controller: "helloCtrl"
        })
            .otherwise({
                redirectTo: '/'
      });
    }]);
    
    
    app.controller("indexCtrl", ["$scope", function($scope) {
        
        $scope.location = "#home";
        $scope.change = function(){
            
            if( $scope.location == "#home" )
                {
                    $scope.location = "#about";
                }
            else
                {
                    $scope.location = "#home";
                }
        };
        
        
    }]);
    
    app.controller("homeCtrl", ["$scope", function($scope) {
        
    }]);
    
    app.controller("helloCtrl", ["$scope", function($scope) {
        
        
    }]);
    
})();