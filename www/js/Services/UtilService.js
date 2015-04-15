angular.module('starter.services')
.factory('UtilService', function ($ionicViewService, $location, $interval) {
    var timer;

    return {
        RedirectWithoutHistory: function (url) {
            $ionicViewService.nextViewOptions({
                disableBack: true
            });
            $location.path(url);
        },
        
        PlaySound: function (audioElement) {
            
        },

        StartTimer: function (delegate, int)
        {
            //Dont start new timer if we have already one
            if (angular.isDefined(timer)) return;
            //what is going to happen every 1000ms (1 sec)
            timer = $interval(function () {
                delegate();
            }, int);
        },

        StopTimer: function ()
        {
            //Stop already running timer
            if (angular.isDefined(timer)) {
                $interval.cancel(timer);
                timer = undefined;
            }
        }

    }
})