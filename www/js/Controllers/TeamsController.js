angular.module('starter.controllers')
.controller('TeamsController', ['$scope', 'Teams', 'GameService', 'UtilService',
    function ($scope, Teams, GameService, UtilService) {
    $scope.teams = Teams.GetAllTeams();

    $scope.removeTeam = function(id) {
        Teams.RemoveTeam(id);
    }
    $scope.addTeam = function () {
        Teams.AddTeam();
    }
    $scope.continue = function (teams, teamForm, $state) {
        console.log(teams);
        console.log(teamForm);
        //clear error messages
        Teams.ClearErrorMessages();
        //validate form and teams
        if (teamForm.$valid && Teams.AreTeamsValid(teams)) {
            //Set initial state of game
            var firstTeam = Teams.GetTeamByOrder(0);
            GameService.SaveState(GameService.GetInitGameState(firstTeam.id), teams);
            //continue to game screen without history
            UtilService.RedirectWithoutHistory("game");
        } else {
            console.log("invalid");
            $scope.errors = Teams.GetErrorMessages();
        }

    }
    $scope.getPicture = function (){
        return Teams.GetRandomPicture();
    }
}])