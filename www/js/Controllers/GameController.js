angular.module('starter.controllers')
.controller('GameController', ['$scope', '$interval', 'GameService', 'UtilService', 'MediaService', 'WordsService', function ($scope, $interval, GameService, UtilService, MediaService, WordsService) {
    //start,correct,wrong buttons
    $scope.buttonsDisabled = true;
    $scope.wordsHidden = false;

    //currently playing team
    var currentTeam = GameService.GetCurrentTeam();
    $scope.currentTeam = currentTeam;

    //current round
    $scope.currentRound = GameService.GetCurrentRound();

    $scope.words = WordsService.LoadWords(currentTeam.points);

    //value of timer
    $scope.rangeValue = 0;

    //identify if timer is on
    $scope.playing = false;

    $scope.icon = GameService.GetType();
    $scope.wordType = GameService.GetTypeWord();

    //stopwatch - start timer function
    $scope.startTimer = function () {
        $scope.playing = true;
        //What is going to happen every cycle in the timer
        var delegate = function () {
            if ($scope.rangeValue == 60 || $scope.rangeValue > 60) {
                try {
                    MediaService.PlayMedia("sound.mp3");
                }
                catch (e) {
                    console.log(e);
                }
                finally {
                    $scope.stop();
                }
            } else {
                $scope.rangeValue++;
            }
        };
        //Interval of one cycle
        var interval = 1000;
        //Start timer
        UtilService.StartTimer(delegate, interval);
    }

    //stopwatch - stop timer function
    $scope.stop = function () {
        $scope.playing = false;
        UtilService.StopTimer();
    }


    var chooseWord = function chooseWord(index)
    {
        if (index === 0) {
            $scope.words[0].selected = true;
            $scope.words[1].selected = false;
        }
        else if (index === 1) {
            $scope.words[0].selected = false;
            $scope.words[1].selected = true;
        }
        else
        {
            throw new Exception("there is somethng very wrong");
        }
    }

    //You can select only one word
    $scope.selectWord = function (index) {
        if($scope.buttonsDisabled){
            //enable stopwatch, correct and wrong button
            $scope.buttonsDisabled = false;
            chooseWord(index);     
            $scope.startTimer();
        }
    }

    $scope.correct = function () {
        //Stop timer, save state, redirect

        console.log("correct");
        var selected = $scope.words[0].selected ? $scope.words[0] : $scope.words[1];
        GameService.Correct(selected);
        defaultState();
        UtilService.RedirectWithoutHistory("results");
    }

    $scope.wrong = function () {
        //Stop timer, call correct, redirect
        console.log("wrong");
        GameService.Wrong();
        defaultState();
        UtilService.RedirectWithoutHistory("results");
    }
    $scope.hideWords = function() {
        $scope.wordsHidden = true;
    }
    $scope.showWords = function () {
        $scope.wordsHidden = false;
    }
    $scope.showHideWordsButton = function() {
        return (($scope.buttonsDisabled == false) && ($scope.wordsHidden == false));
    }
    $scope.showShowWordsButton = function () {
        return (($scope.buttonsDisabled == false) && ($scope.wordsHidden == true));
    }

    function defaultState() {
        $scope.stop();
        $scope.rangeValue = 0;
        $scope.buttonsDisabled = true;
        $scope.wordsHidden = false;
    }

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
