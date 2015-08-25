( function() {
    
    var app = angular.module("shopApp", ['ngCookies']);
    
    app.controller("indexCtrl", ["$scope", "$log", function($scope, $log) {
        
        $http.get("http://www.w3schools.com/angular/customers.php")
    .success(function(response) {
            
            $scope.items = response.records;
            
            $log.info($scope.items);
        });
        
        
                
    }]);
    
    app.controller("itemCtrl", ["$scope", "$http", "$log", "$cookieStore", function($scope, $http, $log, $cookieStore) {
        
        
        var hasCookie = $cookieStore.get('cartCookies');

        if(hasCookie) {

            $scope.cart = hasCookie;
        } else {

            $scope.cart = [];
        }
        
//        $scope.setOnCookie = function () {  
//            
//            $cookieStore.put('cartCookies', $scope.cart);
//            
//        }
        
        $scope.addToCart = function(itemObject) {
            
            var notpresent = true;
                        
            for(i=0; i<$scope.cart.length; i++){
                
                if(angular.equals(itemObject, $scope.cart[i].item))
                        {
                            notpresent = false;
                            $scope.cart[i].count++;
                        }
            }
            
            
            if(notpresent)
                {
                    $scope.cart.push({item:itemObject, count:1});
                    $log.info($scope.cart);
                }
            
            $cookieStore.put('cartCookies', $scope.cart);
        };
        
        $scope.removeFromCart = function(itemObject) {
            
            var present = false;
            
            $scope.temp = itemObject;
            
            for(i=0; i<$scope.cart.length; i++){
                
                if(angular.equals(itemObject, $scope.cart[i]))
                        {
                            
                            if($scope.cart[i].count > 1)
                                {
                                    $scope.cart[i].count -= 1;
                                    
                                }
                            else {
                                
                                $scope.cart.splice(i, 1);
                                
                            }
                        }
            }
            
           $cookieStore.put('cartCookies', $scope.cart);        
            
        };
        
    }]);
    
    
})();