angular.module('starter.controllers')
.controller('FirstPageController', ['$scope', 'GameService','UtilService', function ($scope, GameService, UtilService) {
    $scope.initialized = GameService.IsInitialized();

    $scope.continueTo = function(){
        var phase = GameService.GetPhase();
        if (phase == "GAME") {
            UtilService.RedirectWithoutHistory('game');
        }
        else {
            UtilService.RedirectWithoutHistory('results');
        }
    }
    
    $scope.start = function ()
    {
        //Start new game 
        //Set game state to correct values
        GameService.InitNewGame();
    }


    $scope.supported = GameService.IsLocalStorageAvailable();
}])