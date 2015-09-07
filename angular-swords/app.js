var app = angular.module("SwordsApp", ['ngRoute', 'firebase']); // can't assign var app = because Express assigned var app?

app.config(function($routeProvider){

  $routeProvider
  .when('/:id/edit', {
    templateUrl: 'templates/edit.html',
    controller: 'EditSwordController'
  })
  .when('/:id', {
    templateUrl: 'templates/show.html',
    controller: 'ShowSwordController'
  })
  .when('/', {
    templateUrl: 'templates/swords.html',
    controller: 'SwordsController'
  })
  .otherwise({ redirectTo: '/' });
});
