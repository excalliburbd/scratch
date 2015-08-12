(function() {
    
    var app = angular.module('todoApp', [] );
    
    app.controller( 'todoCtrl', ['$scope', "$log", "$window", function($scope, $log, $window) {
        
        $scope.joblist = [];
        $scope.job = "Write a task...";
        $scope.clear = function() {
            
          $scope.job = "";  
        };
        $scope.addJob = function() {
            
            var present = false;
            
            for(i=0; i<$scope.joblist.length; i++)
                {
                    if($scope.joblist[i] == $scope.job)
                        present = true;
                }
            
            if(present)
                {
                    $window.alert("The task '" + $scope.job + "' already exists!")
                    $scope.job = "Add a different job...";
                }
            else
                {
                 
                    $scope.joblist.push($scope.job);
            
                    $scope.job = "Add another job...";
                }
            
        };
        
        $scope.removeJob = function(got) {
            
//            for(i=0; i<$scope.joblist.length; i++)
//                {
//                    if($scope.joblist[i] == got)
//                        {
//                            $scope.joblist.splice(i, 1);
//                        }
//                }
            
            $scope.joblist.splice(got, 1);
            
            $log.info($scope.joblist);
        };
        
    }]);
})();