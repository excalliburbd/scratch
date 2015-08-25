(function () {

    
    var app = angular.module("shopApp", ['ngCookies']);
    
    app.factory("cartService", ["$rootScope", "$cookieStore", function ($rootScope, $cookieStore) {
        
        var cart = [];
        
        var cookieUpdate = function () {
        
            $cookieStore.put('cartCookies', cart);
        };
        
        var hasCookie = $cookieStore.get('cartCookies');

        if(hasCookie) {

            cart = hasCookie;
            
        }
        
        return {
            
            addToCart : function(itemObject) {
                
                var notpresent = true;
                        
                for(i=0; i<cart.length; i++){

                    if(angular.equals(itemObject, cart[i].item))
                            {
                                notpresent = false;
                                cart[i].count++;
                            }
                }


                if(notpresent)
                    {
                        cart.push({item:itemObject, count:1});
                        
                    }

                cookieUpdate();
                $rootScope.$broadcast("updatecart");
                
            },
            
            removeFromCart : function(itemObject) {
            
                var present = false;

                var temp = itemObject;

                for(i=0; i<cart.length; i++){

                    if(angular.equals(itemObject, cart[i]))
                            {

                                if(cart[i].count > 1)
                                    {
                                        cart[i].count -= 1;

                                    }
                                else {

                                    cart.splice(i, 1);

                                }
                            }
                }

                cookieUpdate();  
                $rootScope.$broadcast("updatecart");
            },
            
            loadCart : function () {
                
                cookieUpdate();
                return cart;
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
        
        $scope.addToCart = function (itemObj) {
            
            cartService.addToCart(itemObj);   
        }
        
        
    }]);
    
    app.controller("itemCtrl", ["$scope", "$log", "cartService", function($scope, $log, cartService) {
        
        $scope.cart = cartService.loadCart();
        
        $scope.$on("updatecart", function () {
            
            $scope.cart = cartService.loadCart();
            
        });
        $scope.removeFromCart = function(itemObj){
            cartService.removeFromCart(itemObj);
        }
        
    }]);
    
})();

