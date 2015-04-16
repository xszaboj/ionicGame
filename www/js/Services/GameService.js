angular.module('starter.services')
.factory('GameService', function (WordsService) {

    var stateKey = "state";

    var currentTeam = null;

    var initialState = {
        game:{
            round: 0,
            currentlyPlayingTeamId: null,
            winner: null,
            end: false,
            currentPhase: null,
            initialized: false, //this will say if teams were added and should be readed from localstorage
        },
        teams: [
            { id: 0, nick: "Team 1", points: 0, order: 0 }
        ],
        
    };

    var loaded = false;

    var currentState = null;

    //Give points to current team
    function givePoints(points) {
        var state = loadState();
        var current = findCurrentTeam(state.teams, state.game.currentlyPlayingTeamId);

        for (var i = 0; i < state.teams.length; i++) {
            var team = state.teams[i];
            if (team.id == currentTeam.id) {
                team.points += points;
                team.lastScore = points;
            }
        }
        saveState(state.game, state.teams);
    }

    //Find current team by id in teams
    function findCurrentTeam(teams, teamId) {
        if (loaded && currentTeam != null) {
            return currentTeam;
        }
        for (var i = 0; i < teams.length; i++) {
            var team = teams[i];
            if (team.id == teamId) {
                currentTeam = team;
                return team;
            }
        }
        return null;
    }

    function saveState(game, teams) {
        if (game != null && teams != null) {
            var state = {};
            state.game = game;
            state.teams = teams;
            var serialized = JSON.stringify(state);
            localStorage.setItem(stateKey, serialized);
            //Team service need to reload teams from localStorage
            loaded = false;
            currentTeam = null;
            currentState = null;
        }
        else {
            return false;
        }
    }

    function loadState() {
        WordsService.InitializeWords();
        //caching abych nemusel porad lezt do localstorage
        if (loaded == true && currentState != null) {
            return currentState;
        }
        var load = localStorage.getItem(stateKey);
        //Neco mame v localStorage
        if (load != null) {
            parsed = JSON.parse(load);
            //if game is initialized return instance of this game
            if (parsed != null && parsed.game.initialized) {
                loaded = true;
                return parsed;
            }
        }
        return initialState;
    }

    function setPhase(phase) {
        var state = loadState();
        state.game.currentPhase = phase;
        saveState(state.game, state.teams);
    }

    //returns the position of team in array of teams returns 0-n
    function getTeamPosition(teams, queryTeam) {
        var queryTeamPosition = -1;
        if (queryTeam != null) {
            for (var i = 0; i < teams.length; i++) {
                var team = teams[i];
                if (team.id == queryTeam.id) {
                    return i;
                }
            }
        }
        return queryTeamPosition;
    }

    function getIconByType(type) {
        if (type == "D") {
            return "aktivity-icon draw";
        }
        if (type == "T") {
            return "aktivity-icon talk";
        }
        if (type == "P") {
            return "aktivity-icon pantomime";
        }
        return "";
    }

    return {
        IsLoaded: function() {
            return loaded;
        },

        GetInitGameState: function(id) {
            return {
                round: 0,
                currentlyPlayingTeamId: id,
                winner: null,
                end: false,
                currentPhase: "GAME",
                initialized: true, //this will say if teams were added and should be readed from localstorage
            };
        },

        IsLocalStorageAvailable: function() {
            if (window.localStorage !== undefined) {
                //Supported
                return true;
            } else {
                //Not supported
                return false;
            }
        },

        SaveState: saveState,

        //Vracime state object, vzdy nam to vrati aspon initalState
        LoadState: loadState,

        IsInitialized: function() {
            return this.LoadState().game.initialized;
        },

        GetPhase: function() {
            return loadState().game.currentPhase;
        },

        InitNewGame: function() {
            this.SaveState(initialState.game, initialState.teams);
        },

        Correct: function(word) {
            //give points, save state,
            if (word != null) {
                givePoints(word.points);
            }
            //this.SetCurrentTeam();
            setPhase("RESULTS");
        },

        Wrong: function () {
            //beacase of last score
            givePoints(0);

            //this.SetCurrentTeam();
            setPhase("RESULTS");
        },

        ContinueToGame: function() {
            setPhase("GAME");
            this.SetCurrentTeam();
        },

        GetCurrentTeam : function() {
            var state = loadState();
            var cTeam = findCurrentTeam(state.teams, state.game.currentlyPlayingTeamId);
            currentTeam = cTeam;
            return currentTeam;
        },

        SetCurrentTeam: function() {
            var state = loadState();
            var teams = state.teams;
            var teamsLength = teams.length;
            //get current team and its positon
            var currentTeam = findCurrentTeam(state.teams, state.game.currentlyPlayingTeamId);
            var currentTeamPosition = getTeamPosition(teams, currentTeam);
            
            //set next(or first) team to current
            var nextTeam = null;
            if (currentTeamPosition < (teamsLength - 1)) {
                nextTeam = teams[currentTeamPosition + 1];
            } else {
                nextTeam = teams[0];
                //round +1
                state.game.round += 1;
            }
            //save state with current team setted to nextTeam
            state.game.currentlyPlayingTeamId = nextTeam.id;
            saveState(state.game, state.teams);
        },

        GetCurrentRound: function() {
            var state = loadState();
            return state.game.round;
        },

        EndGame: function() {
            console.log('end of a game');
        },

        GetType: function() {
            var type = WordsService.GetTypeByPoints(currentTeam.points);
            return getIconByType(type);
        }
    }

})
