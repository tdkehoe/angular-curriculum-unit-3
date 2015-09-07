app.service('SwordsService', ['$route', '$routeParams', '$http', function($route, $routeParams, $http) {

  var Swords = {};


  Swords.getAllSwords = function() { // INDEX route
  return $http.get('http://localhost:8080/api/swords/').then(function(response) { // GET
    // Swords.data = response.data;
    console.log(response)
    return response.data[0];
    // console.log(Swords);
    // console.log("I'm second.");
    // console.log(Swords.data[0].Legbiter);
    //return Swords;
  }, function(response) {
    console.log("Invalid URL");
    // $scope.message = "Invalid URL."
  });
  };

  // Swords.editSword = function(sword) { // Edit route (includes Update route)
  //
  // };
  //
  // Swords.addSword = function(sword) { // CREATE route
  //
  // };
  //
  // Swords.showSword = function(sword) { // SHOW route
  //   $http.get('localhost:8080' + $routeParams.id).then(function(response) { //SHOW
  //     // $scope.sword = response.data;
  //     // console.log($scope.sword);
  //   }, function(response) {
  //     // $scope.message = "Invalid URL."
  //   });
  // };
  //
  // Swords.deleteSword = function(sword) { // Destroy route
  //
  // };
console.log("I'm zeroith!");
return Swords;

}]); // close service
