/*
on a start of a game round will be 0
after all the teams have played, the round will increase by 1
winner is team which gets 60 points or more at the end of their turn
game: {
	round: (int)
	currentlyPlayingTeam: (int) 0 - 6
	winner: (team)
	end: (bool) true == winner is not null
	currentPhase: GAME/RESULTS
	initialized: true/false  -- this will say if teams were added and should be readed from json.file
}

JSON file save:
  - after adding teams
  - at the end of phase GAME
  - at the end of phase RESULTS

*/

describe('Testing GameService', function () {
    var gameService;
    var fakeTeams = [
        { id: 0, nick: "Team 1", points: 0, order: 0 },
        { id: 1, nick: "Team 2", points: 0, order: 1 },
        { id: 2, nick: "Team 3", points: 0, order: 2 }
    ];

    //load services module
    beforeEach(module("starter.services"));

    //inject teamService
    beforeEach(inject(function (GameService) {
        gameService = GameService;
    }));

    it('test initial state of game', function() {
        gameService.InitNewGame();
        var state = gameService.LoadState();
        var game = state.game;
        expect(game.round).toBe(0);
        expect(game.currentlyPlayingTeamId).toBe(null);
        expect(game.winner).toBe(null);
        expect(game.end).toBe(false);
        expect(game.currentPhase).toBe(null);
        expect(game.initialized).toBe(false);
    });

    it('test save state of game and load it back', function() {
        //this happens after continue is clicked
        var initialStateOfGame = gameService.GetInitGameState(0);
        gameService.SaveState(initialStateOfGame, fakeTeams);
        //so teams must be saved and not loaded
        expect(gameService.IsLoaded()).toBe(false);

        var state = gameService.LoadState();
        var game = state.game;
        //game must be initialized and be in phase of GAME
        expect(game.round).toBe(0);
        expect(game.currentlyPlayingTeamId).toBe(fakeTeams[0].id);
        expect(game.winner).toBe(null);
        expect(game.end).toBe(false);
        expect(game.currentPhase).toBe("GAME");
        expect(game.initialized).toBe(true);
        //after load the game must be loaded
        expect(gameService.IsLoaded()).toBe(true);
    });

    it('test GetCurrentTeam and SetCurrentTeam and adding a round', function() {
        //init game
        var initialStateOfGame = gameService.GetInitGameState(0);
        gameService.SaveState(initialStateOfGame, fakeTeams);

        var team1 = gameService.GetCurrentTeam();
        expect(team1.id).toBe(0);

        gameService.SetCurrentTeam();

        var team2 = gameService.GetCurrentTeam();
        expect(team2.id).toBe(1);

        gameService.SetCurrentTeam();

        var team3 = gameService.GetCurrentTeam();
        expect(team3.id).toBe(2);

        gameService.SetCurrentTeam();

        var team4 = gameService.GetCurrentTeam();
        expect(team4.id).toBe(0);

        var round = gameService.GetCurrentRound();
        expect(round).toBe(1);

    });

    it('test correct method and phase', function () {
        //init game
        var initialStateOfGame = gameService.GetInitGameState(0);
        gameService.SaveState(initialStateOfGame, fakeTeams);

        var firstTeam = gameService.GetCurrentTeam();
        expect(firstTeam.points).toBe(0);
        expect(firstTeam.id).toBe(0);

        var fakeWord = { text: "Sunshine", points: 4, selected: false };
        //act
        gameService.Correct(fakeWord);
        //assert
        var state = gameService.LoadState();
        var currentTeam = gameService.GetCurrentTeam();
        expect(currentTeam.id).toBe(1);
        expect(currentTeam.points).toBe(0);
        expect(state.teams[0].id).toBe(0);
        expect(state.teams[0].points).toBe(4);
        expect(state.teams[0].lastScore).toBe(4);
        expect(state.game.currentPhase).toBe("RESULTS");
    });

    it('test wrong method and phase', function () {
        //init game
        var initialStateOfGame = gameService.GetInitGameState(0);
        gameService.SaveState(initialStateOfGame, fakeTeams);

        var firstTeam = gameService.GetCurrentTeam();
        expect(firstTeam.points).toBe(0);
        expect(firstTeam.id).toBe(0);

        var fakeWord = { text: "Sunshine", points: 4, selected: false };
        //act
        gameService.Wrong();
        //assert
        var state = gameService.LoadState();
        var currentTeam = gameService.GetCurrentTeam();
        expect(currentTeam.id).toBe(1);
        expect(currentTeam.points).toBe(0);
        expect(state.teams[0].id).toBe(0);
        expect(state.teams[0].points).toBe(0);
        expect(state.teams[0].lastScore).toBe(0);
        expect(state.game.currentPhase).toBe("RESULTS");
    });


    it('test continueToGame', function () {
        //init game
        var initialStateOfGame = gameService.GetInitGameState(0);
        gameService.SaveState(initialStateOfGame, fakeTeams);

        //act
        gameService.Wrong();
        var state = gameService.LoadState();
        expect(state.game.currentPhase).toBe("RESULTS");
        gameService.ContinueToGame();

        //assert
        var state = gameService.LoadState();
        expect(state.game.currentPhase).toBe("GAME");
    });


    it('is end of test, so delete localStorage', function() {
        localStorage.clear();
    });

})