var data;
var myApp = angular.module('myApp', ['ui.router', 'firebase'])
// Config route provider
.config(function($stateProvider) {
    $stateProvider
  .state('home', {
    url:'',
    templateUrl: 'templates/home.html',
    controller: 'HomeController',
  })
  .state('projects', {
    url:'/projects',
    templateUrl: 'templates/projects.html',
    controller: 'ProjectsController',
  })
  .state('achievements', {
  	url:'/achievements',
  	templateUrl: 'templates/achievements.html',
  	controller: 'AchievementsController',
  })
  .state('activities', {
    url:'/activities',
    templateUrl: 'templates/activities.html',
    controller: 'ActivitiesController',
  })
  .state('about', {
    url:'/about',
    templateUrl: 'templates/about.html',
    controller: 'AboutController',
  })
  .state('contact', {
    url:'/contact',
    templateUrl: 'templates/contact.html',
    controller: 'ContactController',
  })
})

// Landing page controller: define $scope.number as a number
.controller('HomeController', function($scope){
  $scope.backpic = 'background.jpg';
})

// Projects controller: define $scope.url as an image
.controller('ProjectsController', function($scope, $http){
  $http.get('data/projects.JSON').success(function(dat) {
    data = $scope.projects = dat;
  })
})

//Achievements controller: define $scope.achievements as a string
.controller('AchievementsController', function($scope, $http){
	$http.get('data/achievements.JSON').success(function(dat){
    data = $scope.achievements = dat;
  })
})

//Activities controller: define $scope.activities as a string
.controller('ActivitiesController', function($scope, $http){
  $http.get('data/activities.JSON').success(function(dat){
    data = $scope.activities = dat;
  })
})
// About page controller: define $scope.about as a string
.controller('AboutController', function($scope){
  $scope.about = "Here's some information about this page."
})
//Contact Me controller: does nothing really
.controller('ContactController',function($scope, $firebaseAuth, $firebaseArray, $firebaseObject){
  var ref = new Firebase('https://portfolio503.firebaseio.com/')
  var messagesRef = ref.child("messages");
  $scope.messages = $firebaseArray(messagesRef);
  $scope.addMessageClick = false;

  //adds a message to firebase
  $scope.addMessage = function() {
    $scope.messages.$add({
      name:$scope.name,
      message:preventScriptInjection($scope.message)
    })
    .then(function() {
      $scope.clear();
    });
    $scope.addMessageClick = false;
  }

  //clears the input for the message form on the html page
  $scope.clear = function() {
    $scope.name = "";
    $scope.message = "";
  }

  //used to prevent script injection for the textarea tag
  var preventScriptInjection = function(html) {
    return $($.parseHTML(html)).text();
  }
})

