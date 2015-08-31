app.config(function($routeProvider){

  $routeProvider
  .when('/', {
    templateUrl: 'templates/pages/reddit.html',
    controller: 'RedditController'
  })
  .otherwise({ redirectTo: '/' });
});
