app.controller('RedditController', ["$scope", '$firebaseArray',  function($scope, $firebaseArray){ // do I need to inject $firebaseObject?
  var ref = new Firebase("https://tdk-reddit-clone.firebaseIO.com/posts"); // download data from remote database and synchronize to the local database
  posts = $firebaseArray(ref);
  posts.$loaded().then(function(){
    $scope.posts = posts; // populate local data from remore database

    //  var posts = [
    //    {
    //      park: "Viñales",
    //      province: "Pinar del Rio",
    //      image: "http://www.particuba.net/villes/vinales/images/_Grandes/ValleVinales_Szabo350.jpg",
    //      description: "Mogotes and tobacco fields.",
    //      timestamp: Date.now(),
    //      comments: [{commentText: "Build a hotel here!", commentAuthor: "Fidel", commentTimestamp: 1441075316826}],
    //      showComments: false
    //    },
    //    {
    //      park: "Topes de Collantes",
    //      province: "Cienfuegos, Villa Clara, Sancti Spiritus",
    //      image: "http://wikitravel.org/upload/shared//thumb/0/00/SaltodeRocio.jpg/350px-SaltodeRocio.jpg",
    //      description: "Mountains and waterfalls.",
    //      timestamp: Date.now(),
    //      comments: [],
    //      showComments: false
    //    }

     moment().calendar(null, {
       sameDay: '[Today]',
       nextDay: '[Tomorrow]',
       nextWeek: 'dddd',
       lastDay: '[Yesterday]',
       lastWeek: '[Last] dddd'
     });

     // Submit function
     $scope.submit = function(){
       var post = {
         park: $scope.post.park,
         province: $scope.post.province,
         image: $scope.post.image,
         description: $scope.post.description,
         timestamp: Date.now(),
         comments: [],
         showComments: false
       };
       $scope.posts.$add(post).then(function(data) {
         console.log(data);
       })
     };

    //  Date function
    //  $scope.message.time = $scope.posts.timestamp;

   /*
     // Voting function
     // var votes = $scope.$storage.posts.votes || 0;
     $scope.upVote = function(){

       console.log("Up voted!");
       $scope.$storage.posts.count = $scope.$storage.posts.count + 1;
       console.log($scope.$storage.posts.count);
     //   post.votes++;
     //   updateVote(post.id, post.votes);
     // };
     //
     // $scope.downVote = function(post){
     //   post.votes--;
     //   updateVote(post.id,post.votes);
     // };
     //
     // function updateVote(id,votes){
     //   $http.get('ajax/updateVote.php?id='+id+'&votes='+votes).success(function(data){
     };
   */

     // Comments function
     $scope.newComment = function(post) {
       console.log("New comment!");
       var index = $scope.posts.indexOf(post);
       var comment = {
         commentAuthor: $scope.posts[index].newComment.commentAuthor,
         commentText: $scope.posts[index].newComment.commentText,
         commentTimestamp: Date.now(),
       };
       var comments = $scope.posts[index].comments || [];
       comments.push(comment); // push comment to local $scope
       $scope.posts[index].newComment.commentAuthor = null; // needed to prevent autofilling fields
       $scope.posts[index].newComment.commentText = null; // needed to prevent autofilling fields
       $scope.posts[index].comments = comments; // saves new comment locally
       $scope.posts.$save($scope.posts[index]); // saves new comment to remote database
     }; // closes newComment

     // Delete function
     // Delete removes post from array but ng-repeat doesn't remove empty hole from the DOM
     $scope.deletePost = function(post) {
       console.log("Deleting!");
       var index = $scope.posts.indexOf(post);
       delete $scope.posts[index];
       console.log($scope.posts);
     }

  })
  .catch(function(error){
   console.log("Error:", error);
  });

}]);
