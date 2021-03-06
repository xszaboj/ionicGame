// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ngCordova','ionic', 'starter.controllers', 'starter.services', 'angular-data.DSCacheFactory', 'pascalprecht.translate' ])

.run(function ($ionicPlatform, DSCacheFactory) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        DSCacheFactory("staticCache", { storage: "localStorage" });
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
        url: "/home",
        templateUrl: "templates/home.html",
        controller: 'FirstPageController'
    })
    .state('teams', { 
        url: "/teams",
        templateUrl: "templates/teams.html",
        controller: 'TeamsController',
    })
    .state('results', { 
       url: "/results",
       templateUrl: "templates/results.html",
      controller: 'ResultsController',
    })
    .state('game', { 
      url: "/game",
      templateUrl: "templates/game.html",
      controller: 'GameController',
    })
    .state('options',{ 
      url: "/options",
      templateUrl:"templates/options.html",
      controller:"OptionController",
    })
    .state('draw', {
        url: "/draw",
        templateUrl: "templates/draw.html",
        controller: "DrawController",
    });

    $urlRouterProvider.otherwise("/home");


})
