(function(){
    var app = angular.module('scratchApp', []);

    app.controller('NameCtrl', ['$scope', '$http', function($scope, $http) {
        
        $scope.name = "Guest";
        $scope.tog = true;
        
        $http.get("http://www.w3schools.com/angular/customers.php")
    .success(function(response) {
            
            $scope.names = response.records;
        });
        
        $scope.toggle = function() {
            
            $scope.tog = !$scope.tog;
            
        };
        
    }]);       
        
})();