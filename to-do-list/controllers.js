app.controller('ToDoListController', ['$scope', '$firebaseArray', function($scope, $firebaseArray){
    $scope.todos = $firebaseArray(new Firebase("https://tdk-to-do-list.firebaseio.com/list")) // download data from remote database and synchronize to the local database
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
      // console.log("indexFor: " + $scope.todos.$indexFor("-JxpDWfRSq4-WSghEfw0"));
      // console.log("getRecord: " + $scope.todos.$getRecord("-JxpDWfRSq4-WSghEfw0"));
      // console.log("keyAt: " + $scope.todos.$keyAt(todo));
      var key = $scope.todos.$keyAt(todo);
      var index = $scope.todos.$indexFor(key);
      $scope.todos[index].completed = true;
      $scope.todos.$save(index);

    }

  }
]);
