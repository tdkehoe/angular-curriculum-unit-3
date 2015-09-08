app.controller('AuthController', function($scope, $location, $firebaseAuth){
  var authRef = new Firebase("https://tdk-to-do-list-auth.firebaseio.com");
  var authObj = $firebaseAuth(authRef);

  $scope.register = function() { // NEW USER
    console.log("Registering user!");
    authObj.$createUser($scope.user, function(error, userData) {
      console.log("In callback.");
      if (error) {
        console.log("Error creating user: ", error);
      } else {
        console.log("Successfully created user account with uid: ", userData.uid);
      }
    }).then(function(){
      $scope.login();
    });
  }

/*
  // Doesn't work, logs in everyone, with good or bad passwords
  // Create a callback to handle the result of the authentication
  function authHandler(error, authData) {
    console.log("In authHandler");
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
    }
  }

  $scope.login = function(){
    // Or with an email/password combination
    authObj.$authWithPassword({
      email    : 'bobtony@firebase.com',
      password : 'correcthorsebatterystaple'
    }, authHandler)
  .then(function(){
    console.log("In promise.");
    $location.path('/todos');
  })
}
*/

  $scope.login = function(){
    authObj.$authWithPassword($scope.user).then(function(){
      console.log("In promise.");
      $location.path('/todos');
    })
  }

/*
  // Doesn't work, no error message, the callback function is never called
  $scope.login = function(){
    authObj.$authWithPassword({
      email    : "bobtony@firebase.com",
      password : "correcthorsebatterystaple"
    }, function(error, authData) {
      console.log("In callback.");
      console.log(authData);
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });
  };
*/

/*
// Correct login works but incorrect login doesn't do anything
  $scope.login = function () {
    authObj.$authWithPassword($scope.user, function(error, authData) {
      console.log("In callback.");
      if (error) {
        console.log("Login failed: ", error);
      } else {
        console.log("Authenticated successfully: ", authData);
        $location.path('/todos')
      }
    }, {
      remember: "sessionOnly"
    })
    .then(function(error, authData) {
      console.log("In promise.");
      console.log(authData);
      $location.path('/todos');
      // if (error) {
      //   console.log("Login failed: ", error);
      // } else {
      //   console.log("Authenticated successfully: ", authData);
      //   $location.path('/todos')
      // }
    })
  }
*/

})

app.controller('ToDoListController', ['$scope', '$firebaseArray', '$firebaseAuth', '$location', 'user', function($scope, $firebaseArray, $firebaseAuth, $location, user){
  console.log(user);
  var authRef = new Firebase("https://tdk-to-do-list-auth.firebaseio.com");
  var authObj = $firebaseAuth(authRef);

  var todosRef = new Firebase("https://tdk-to-do-list-auth.firebaseio.com//list"); // double slash?
  $scope.todos = $firebaseArray(todosRef);
  $scope.newToDo = {text: "", completed: false}; // set form for new data

  $scope.addTask = function() {
    $scope.todos.$add($scope.newToDo).then(function(data) { // add data to remote database, then a promise
      $scope.newToDo.text = ""; // reset form
    });
  };

  $scope.removeTask = function(todo) {
    $scope.todos.$remove(todo); // remote data to remote database and local
  };

  $scope.completeTask = function(todo) {
    console.log("Clicked!");
    var key = $scope.todos.$keyAt(todo);
    var index = $scope.todos.$indexFor(key);
    $scope.todos[index].completed = true;
    $scope.todos.$save(index);
  }

  $scope.logout = function(todo) {
    authObj.$unauth();
    $location.path('/');
  }

}]);
