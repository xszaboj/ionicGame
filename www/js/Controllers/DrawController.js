angular.module('starter.controllers')
.controller('DrawController', ['$scope', function($scope) {
    $scope.draw = "Click to start drawing";
    
    $scope.width = innerWidth;
    $scope.height = innerHeight;
    $scope.exist = false;
    $scope.init = function () {
        if (!$scope.exist) {
            $scope.exist = true;
            var simpleboard = new DrawingBoard.Board('simple-board', {
                controls: [{ Navigation: { back: false, forward: false } }],
                controlsPosition: "top",
                webStorage: false

            });
        }
    }
}])