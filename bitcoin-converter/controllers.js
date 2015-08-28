// app.controller('CurrencyController', ['$scope', '$firebaseObject', function($scope, $firebaseObject){
angular.module("BitCoinApp", ['firebase'])
.controller('CurrencyController', ['$scope', '$firebaseObject', function($scope, $firebaseObject){
    var allcoinRef = new Firebase("https://publicdata-cryptocurrency.firebaseio.com");
    $scope.allcoinData = $firebaseObject(allcoinRef);
  }
]);
