var app = angular.module("ToDoListApp", ['firebase', 'ngRoute']);

app.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'app/partials/landing.html',
    controller: 'AuthController'
  })
  .when('/todos', {
    templateUrl: 'app/partials/todos.html',
    controller: 'ToDoListController',
    resolve: {user: resolveUser}
  })
  .otherwise({ redirectTo: '/' });
})

app.run(function($rootScope, $location){
  $rootScope.$on('$routeChangeError', function(event, next, previos, error){
    if (error === "AUTH_REQUIRED"){
      $location.path('/');
    }
  })
})

function resolveUser($firebaseAuth) {
  var authRef = new Firebase("https://tdk-to-do-list-auth.firebaseio.com");
  var authObj = $firebaseAuth(authRef);

  return authObj.$requireAuth();
}
