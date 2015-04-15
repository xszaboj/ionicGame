angular.module('starter.services')

.factory('ResultService', function(Teams, GameService) {

    function getLastScore() {
        return 0;
    }

    return {
        GetAllTeamsPoints: function () {
            var state = GameService.LoadState();
            var currentTeamId = GameService.GetCurrentTeam().id;

            var teamsScore = [];
            var teams = Teams.GetAllTeams();
            for (var i = 0; i < teams.length; i++) {
                var team = teams[i];
                var score = { nick: team.nick, score: team.points, lastScore: team.lastScore };
                if (team.id === currentTeamId) {
                    score = { nick: team.nick, score: team.points, lastScore: team.lastScore, current: true };
                }
                teamsScore.push(score);
            }
            return teamsScore;
        },
        Winner : function () {
            var teams = Teams.GetAllTeams();
            for (var i = 0; i < teams.length; i++) {
                var team = teams[i];
                if (team.points >= 60) {
                    GameService.EndGame();
                    return true;
                }
            }
            return false;
        }
    }
})