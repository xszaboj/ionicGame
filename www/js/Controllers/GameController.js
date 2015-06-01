angular.module('starter.controllers')
.controller('GameController', ['$scope', 'GameService', 'UtilService', 'WordsService', 'GameDrawingService', 'GameTimerService',
    function ($scope, GameService, UtilService, WordsService, GameDrawingService, GameTimerService) {
    $scope.wordIsNotSelected = true;
    $scope.wordsHidden = false;
    $scope.currentTeam = GameService.GetCurrentTeam();
    $scope.currentRound = GameService.GetCurrentRound();
    $scope.words = WordsService.LoadWords($scope.currentTeam.points);
    $scope.rangeValue = 0;
    $scope.type = GameService.GetType();
    $scope.icon = GameService.GetTypeIcon();
    $scope.wordType = GameService.GetTypeWord();

    var chooseWord = function chooseWord(index)
    {
        $scope.words[0].selected = false;
        $scope.words[1].selected = false;
        $scope.words[index].selected = true;
    }

    //You can select only one word
    $scope.selectWord = function (index) {
        if($scope.wordIsNotSelected){
            $scope.wordIsNotSelected = false;
            chooseWord(index);     
            GameTimerService.StartTimer($scope);
        }
    }

    $scope.correct = function () {
        var selected = $scope.words[0].selected ? $scope.words[0] : $scope.words[1];
        GameService.Correct(selected);
        redirectToResults("correct");
    }
    $scope.wrong = function () {
        GameService.Wrong();
        redirectToResults("wrong");
    }
    function redirectToResults(state){
        console.log(state);
        setGameDefaultState();
        $scope.simpleboard = null;
        UtilService.RedirectWithoutHistory("results");
    }

    $scope.hideWords = function() {
        $scope.wordsHidden = true;
    }
    $scope.showWords = function () {
        $scope.wordsHidden = false;
    }
    $scope.showHideWordsButton = function() {
        return (($scope.wordIsNotSelected == false) && ($scope.wordsHidden == false));
    }
    $scope.showShowWordsButton = function () {
        return (($scope.wordIsNotSelected == false) && ($scope.wordsHidden == true));
    }

    function setGameDefaultState() {
        GameTimerService.StopTimer();
        $scope.rangeValue = 0;
        $scope.wordIsNotSelected = true;
        $scope.wordsHidden = false;
    }

    /*Drawing window*/
    $scope.isDrawing = function () {
        return GameDrawingService.IsGameTypeDrawing($scope);
    }
    GameDrawingService.InitializeModalWindow($scope);
    $scope.openModal = function () {
        GameDrawingService.OpenWindow($scope.modal);
    };
    $scope.closeModal = function () {
        GameDrawingService.CloseWindow($scope.modal);
    };
    GameDrawingService.DestroyWindowEvent($scope);
    $scope.width = GameDrawingService.GetWidth();
    $scope.height = GameDrawingService.GetHeight();
    $scope.exist = false;
    $scope.init = function (){ GameDrawingService.Init($scope); }

}])

.directive('mySelected', function () {
    return {
        link: function (scope, element, attrs) {
            scope.$watch(function (scope) { return attrs.mySelected; }, function (value) {
                if (value == "true") {
                    element.addClass('wordSelected');
                }
                if (value == "false") {
                    element.removeClass('wordSelected');
                }
            });
        }
    }
})
