// app.controller('SwordsController', ["$scope", 'SwordsService', '$firebaseArray', function($scope, SwordsService, $firebaseArray){
app.controller('SwordsController', ["$scope", '$firebaseArray', '$http', '$location', '$routeParams', function($scope, $firebaseArray, $http, $location, $routeParams){

  $http.get('http://localhost:8080/api/swords/').then(function(response) { // INDEX
    $scope.swords = response.data;
  }, function(response) {
    console.log("Invalid URL");
  });

  $scope.addSword = function(sword){ // NEW
    var sword = {
      swordName:  $scope.sword.swordName,
      swordOwner: $scope.sword.swordOwner
    }
    $http.post('http://localhost:8080/api/swords/', sword).then(function(response) {
      console.log("Sword added.");
    }, function(response) {
      console.log("Invalid URL");
    });
  }

  $scope.deleteSword = function(sword) { // DESTROY
    console.log("Deleting Sword!");
    console.log(sword._id);
    $http.delete('http://localhost:8080/api/swords/' + sword._id)
  }

}]);

app.controller('ShowSwordController', ["$scope", '$http', "$routeParams", function($scope, $http, $routeParams){
  console.log("Show controller");
  $http.get('http://localhost:8080/api/swords/' + $routeParams.id).then(function(response) { // SHOW
    $scope.oneSword = response.data;
    console.log(response.data);
  }, function(response) {
    console.log("Invalid URL");
  });
}]);

app.controller('EditSwordController', ["$scope", '$http', "$routeParams", function($scope, $http, $routeParams){
  console.log("Edit controller");
  $http.get('http://localhost:8080/api/swords/' + $routeParams.id + '/edit/').then(function(response) { // EDIT
    $scope.editSword = response.data;
    console.log(response.data);
  }, function(response) {
    console.log("Invalid URL");
  });

  $scope.updateSword = function(sword) {
    console.log("Updating sword.");
    var sword = {
      swordName:  $scope.sword.swordName,
      swordOwner: $scope.sword.swordOwner
    }
    $http.put('http://localhost:8080/api/swords/' + $routeParams.id, sword).then(function(response) { // UPDATE
      console.log("Sword updated.");
    }, function(response) {
      console.log("Invalid URL");
    });
  }

}]);
