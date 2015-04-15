angular.module('starter.controllers')
.controller('GameController', ['$scope', '$interval', 'GameService', 'UtilService', 'MediaService', 'WordsService', function ($scope, $interval, GameService, UtilService, MediaService, WordsService) {
    //start,correct,wrong buttons
    $scope.buttonsDisabled = true;

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

    //You can select only one word
    $scope.selectWord = function (index) {
        //enable stopwatch, correct and wrong button
        $scope.buttonsDisabled = false;

        //choose word
        if (index === 0) {
            $scope.words[0].selected = true;
            $scope.words[1].selected = false;
        }
        if (index === 1) {
            $scope.words[0].selected = false;
            $scope.words[1].selected = true;
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

    function defaultState() {
        $scope.stop();
        $scope.rangeValue = 0;
        $scope.buttonsDisabled = true;

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
