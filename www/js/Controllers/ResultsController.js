angular.module('starter.controllers')
    .controller('ResultsController', [
        '$scope', 'ResultService', 'UtilService', 'GameService', function ($scope, ResultService, UtilService, GameService) {
    $scope.teamsScore = ResultService.GetAllTeamsPoints();
    $scope.isEnd = ResultService.Winner();
    //console.log(ResultService.GetAllTeamsPoints());
    var currentTeam = GameService.GetCurrentTeam();
    $scope.currentTeam = currentTeam;

    $scope.continue = function () {
        console.log("continue");
        GameService.ContinueToGame();
        UtilService.RedirectWithoutHistory("game");
    }

    $scope.start = function() {
        GameService.InitNewGame();
        UtilService.RedirectWithoutHistory("teams");
    }

}])