app.controller('RedditController', ["$scope", function($scope){
   $scope.message = "Connected!";
   console.log("Controlling!");

   $scope.posts = [
     {
       park: "Vinales",
       province: "Pinar del Rio",
       image: "http://www.particuba.net/villes/vinales/images/_Grandes/ValleVinales_Szabo350.jpg",
       description: "Mogotes and tobacco fields.",
       timestamp: Date.now(),
       comments: [],
       showComments: false
     },
     {
       park: "Topes de Collantes",
       province: "Cienfuegos, Villa Clara, Sancti Spiritus",
       image: "http://wikitravel.org/upload/shared//thumb/0/00/SaltodeRocio.jpg/350px-SaltodeRocio.jpg",
       description: "Mountains and waterfalls.",
       timestamp: Date.now(),
       comments: [],
       showComments: false
     }
   ];

  console.log($scope.posts);

   moment().calendar(null, {
     sameDay: '[Today]',
     nextDay: '[Tomorrow]',
     nextWeek: 'dddd',
     lastDay: '[Yesterday]',
     lastWeek: '[Last] dddd'
   });

   // Submit function
   $scope.submit = function(){
     console.log("Submitted!");

     var post = {
       park: $scope.post.park,
       province: $scope.post.province,
       image: $scope.post.image,
       description: $scope.post.description,
       timestamp: Date.now(),
       comments: [],
       showComments: false
     };
     posts.push(post);
     console.log(posts);
     $scope.posts = posts;
   };

   // Date function
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
   var comments = $scope.posts.comments || [];

   $scope.newComment = function(post) {
     var index = $scope.posts.indexOf(post);
     var comment = {
       commentAuthor: $scope.posts[index].comments.commentAuthor,
       commentText: $scope.posts[index].comments.commentText,
       commentTimestamp: Date.now(),
     };
     comments.push(comment);
     $scope.posts[index].comments = comments;
   };

   // Delete function
   // Delete removes post from array but ng-repeat doesn't remove empty hole from the DOM
   $scope.deletePost = function(post) {
     console.log("Deleting!");
     var index = $scope.posts.indexOf(post);
     delete $scope.posts[index];
     console.log($scope.posts);
   }





}]);
