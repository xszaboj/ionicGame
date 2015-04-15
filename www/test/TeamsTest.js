/*
You have to add at least two teams
You can add max six teams
Max length of team nick is 60 characters
names of teams must be unique
team can be removed after adding it
teams will be saved to json File
teams starts with point = 0
teams starts with unique order
*/

describe("Testing Teams service", function () {
    var teamService;
    //load services module
    beforeEach(module("starter.services"));

    //inject teamService
    beforeEach(inject(function(Teams) {
        teamService = Teams;
    }));

    it("first call of getAllTeams should return only one team", function () {
        var teams = teamService.GetAllTeams();
        expect(teams.length).toBe(1);
    });

    it("after adding a team there should be two teams", function() {
        teamService.AddTeam();
        var teams = teamService.GetAllTeams();
        expect(teams.length).toBe(2);
        
    });

    it("two teams should not have same id", function () {
        teamService.AddTeam();
        var teams = teamService.GetAllTeams();
        expect(teams[0].id).not.toBe(teams[1].id);
    });

    it("Test add and remove team", function() {
        //Arrange
        teamService.AddTeam();
        var teams = teamService.GetAllTeams();
        expect(teams.length).toBe(2);
        //Act
        teamService.RemoveTeam(teams[0].id);
        //Assert
        teams = teamService.GetAllTeams();
        expect(teams.length).toBe(1);
        expect(teams[0].id).toBe(1);
    });

    it("Get team by order, should return teams with id = 1", function () {
        //Arrange
        teamService.AddTeam();
        //Act
        var team = teamService.GetTeamByOrder(1);
        //Assert
        expect(team.id).toBe(1);
    });

    it("Get team at not existing order, should return null", function () {
        //Arrange
        teamService.AddTeam();
        //Act
        var team = teamService.GetTeamByOrder(3);
        //Assert
        expect(team).toBe(null);
    });

    it("Nick is valid, 1-20 chars", function () {
        teamService.AddTeam();
        var teams = teamService.GetAllTeams();
        var valid = teamService.AreTeamsValid(teams);
        expect(valid).toBe(true);
    });

    it("Nick is invalid, 1-20 chars", function () {
        teamService.AddTeam();
        var teams = teamService.GetAllTeams();
        teams[0].nick = "";
        teams[1].nick = "toooooooooooloooooooooong";
        var valid = teamService.AreTeamsValid(teams);
        expect(valid).toBe(false);
        var errors = teamService.GetErrorMessages();
        expect(errors[0]).toEqual("Nick is not valid");
    });

    it("Are points invalid, when != 0 points", function () {
        teamService.AddTeam();
        var teams = teamService.GetAllTeams();
        teams[0].points = 1;
        var valid = teamService.AreTeamsValid(teams);
        expect(valid).toBe(false);
        var errors = teamService.GetErrorMessages();
        expect(errors[0]).toEqual("Points must be null");
    });

    it("Is number of teams invalid, when less than 2 ", function () {
        var teams = teamService.GetAllTeams();
        var valid = teamService.AreTeamsValid(teams);
        expect(valid).toBe(false);
        var errors = teamService.GetErrorMessages();
        expect(errors[0]).toEqual("There must be min 2 and max 6 teams");

    });

    it("Is number of teams invalid, when more than 6", function () {
        teamService.AddTeam();
        teamService.AddTeam();
        teamService.AddTeam();
        teamService.AddTeam();
        teamService.AddTeam();
        teamService.AddTeam();
        var teams = teamService.GetAllTeams();
        var valid = teamService.AreTeamsValid(teams);
        expect(valid).toBe(false);
        var errors = teamService.GetErrorMessages();
        expect(errors[0]).toEqual("There must be min 2 and max 6 teams");

    });

    it("Test uniqueness of nick to fail", function () {
        teamService.AddTeam();
        teamService.AddTeam();
        var teams = teamService.GetAllTeams();
        teams[0].nick = "test";
        teams[1].nick = "test";
        var valid = teamService.AreTeamsValid(teams);
        expect(valid).toBe(false);
        var errors = teamService.GetErrorMessages();
        expect(errors[0]).toEqual("Names of teams must be unique");
    });

    it("Test uniqueness of order to fail", function () {
        teamService.AddTeam();
        teamService.AddTeam();
        var teams = teamService.GetAllTeams();
        teams[0].order = 0;
        teams[1].order = 0;
        var valid = teamService.AreTeamsValid(teams);
        expect(valid).toBe(false);
        var errors = teamService.GetErrorMessages();
        expect(errors[0]).toEqual("Orders of teams must be unique");
    });

    it("Test sorting of teams", function() {
        teamService.AddTeam();
        teamService.AddTeam();
        var teams = teamService.GetAllTeams();
        teams[0].order = 4;
        teams[1].order = 1;

        var first = teamService.GetTeamByOrder(0);
        var second = teamService.GetTeamByOrder(1);
        var third = teamService.GetTeamByOrder(2);

        expect(first.id).toBe(1);
        expect(second.id).toBe(2);
        expect(third.id).toBe(0);


    });
});