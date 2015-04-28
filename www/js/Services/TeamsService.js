angular.module('starter.services')

.factory('Teams', function (GameService) {
    //testing data
    var teams = [];

    var errorMessages = [];

    var id = 1;

    function generatePicture()
    {
        var maxColumn = 19;
        var maxRow = 13;
        var randColumn = Math.floor((Math.random() * maxColumn));
        var randRow = Math.floor((Math.random() * maxRow));
        var resultColumn = randColumn * 60;
        var resultRow = randRow * 60;
        return (-resultColumn) + "px " + (-resultRow) +"px";
    }

    function generateNextId() {
        return id++;
    }

    function generateNextOrder() {
        return id;
    }

    function addErrorMessage(message) {
        errorMessages.push(message);
    }

    function isNickValid(nick) {
        //Max length of team nick is 20 characters
        //Min length of team nick is 1 character
        if (nick != null && nick.length < 20 && nick.length > 0) {
            return true;
        } else {
            addErrorMessage("Nick is not valid");
            return false;
        }
    }

    function isNumberOfTeamsValid(number) {
        //You have to add at least two teams
        //You can add max six teams
        if (number >= 2 && number <= 6) {
            return true;
        } else {
            addErrorMessage("There must be min 2 and max 6 teams");
            return false;
        }
    }

    function areNicksUnique(teams) {
        //nicks of teams must be unique
        for (var i = 0; i < teams.length; i++) {
            var currentTeam = teams[i];
            var nick = currentTeam.nick;
            for (var j = 0; j < teams.length; j++) {
                var team = teams[j];
                if (nick == team.nick && team.id != currentTeam.id) {
                    //rovnaji se jmena u ruznych teamu coz nesmeji
                    addErrorMessage("Names of teams must be unique");
                    return false;
                }
            }
        }
        return true;
    }

    function areOrdersUnique(teams) {
        //orders of teams must be unique
        for (var i = 0; i < teams.length; i++) {
            var currentTeam = teams[i];
            var order = currentTeam.order;
            for (var j = 0; j < teams.length; j++) {
                var team = teams[j];
                if (order == team.order && team.id != currentTeam.id) {
                    //rovnaji se jmena u ruznych teamu coz nesmeji
                    addErrorMessage("Orders of teams must be unique");
                    return false;
                }
            }
        }
        return true;
    }

    function arePointsValid(points) {
        if (points == 0)
            return true;
        else {
            addErrorMessage("Points must be null");
            return false;
        }
    }

    function sortTeamsByOrder(teams) {
        var result = teams.sort(function (a, b) {
            return a.order - b.order;
        });
        return result;
    }


    return {
        GetAllTeams: function () {
            var state = GameService.LoadState();
            teams = state.teams;
            return teams;
        },

        GetTeamByOrder: function (number) {
            if (number != null && number < teams.length) {
                return sortTeamsByOrder(this.GetAllTeams())[number];
            } else {
                return null;
            }
        },

        RemoveTeam: function (id) {
            var teams = this.GetAllTeams();
            for (var i = 0; i < teams.length; i++) {
                var team = teams[i];
                if (team.id === id) {
                    teams.splice(i, 1);
                }
            }
        },

        AddTeam: function () {
            var teams = this.GetAllTeams();
            var team = {
                id: generateNextId(),
                nick: "Team " + id,
                points: 0,
                order: generateNextOrder(),
                lastScore:0,
                picture:"0px 0px"
        }
            teams.push(team);
        },

        AreTeamsValid: function (teams) {
            if (teams != null) {
                for (var i = 0; i < teams.length; i++) {
                    var team = teams[i];
                    if (!isNickValid(team.nick) || !arePointsValid(team.points)) {
                        return false;
                    }
                }
                if (!isNumberOfTeamsValid(teams.length) || !areNicksUnique(teams) || !areOrdersUnique(teams)) {
                    return false;
                }
                return true;
            } else {
                addErrorMessage("You must provide some teams");
                return false;
            }
        },

        GetErrorMessages: function () {
            return errorMessages;
        },

        ClearErrorMessages: function () {
            errorMessages = [];
        },
        GetRandomPicture: function(){
            return generatePicture();
        }
    }
})