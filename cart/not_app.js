(function () {

    
    var app = angular.module("shopApp", ['ngCookies']);
    
    app.factory("cartService", ["$scope", "$rootScope", "$cookieStore", function ($scope, $rootScope, $cookieStore) {
        $scope.cart = [];
        
        $scope.cookieUpdate = function () {
        
            $cookieStore.put('cartCookies', $scope.cart);
        };
        
        var hasCookie = $cookieStore.get('cartCookies');

        if(hasCookie) {

            $scope.cart = hasCookie;
            
        }
        
        return {
            
            addToCart : function(itemObject) {
                
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

                $scope.cookieUpdate();
                $rootScope.$broadcast("add");
                
            },
            
            removeFromCart : function(itemObject) {
            
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

                $scope.cookieUpdate();        
            },
            
            loadCart : function (obj) {
                
                $scope.cart = obj;
                $rootScope.$broadcast("load")
            }
        }
        
    }]);

    app.controller("indexCtrl", ["$scope", "$log", "$http", "cartService", function($scope, $log, $http, cartService) {
        
        $http.get("http://www.w3schools.com/angular/customers.php")
            .success(function(response) {
            
                $scope.items = [];
                var length = response.records.length;
                for (var i=0; i<length; i+=3) {
                    
                    $scope.items.push(response.records.slice(i, i+3));
                }                
                
                if(length % 3 != 0) {
                    
                    $scope.items.push(response.records.slice(length-length%3, length%3));
                }
            });
        
        $scope.$on("add", function() {
            
            cartService.addToCart();   
        })
        
    }]);
    
    app.controller("itemCtrl", ["$scope", "$log", "cartService", function($scope, $log, cartService) {
        
        $scope.$on("remove", function () {
            
            cartService.removeFromCart();
            
        });
        
    }]);
})();

