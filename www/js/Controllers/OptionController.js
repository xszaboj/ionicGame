angular.module('starter.controllers')
.controller('OptionController', ['$scope', '$translate', function ($scope, $translate) {

	$scope.languages = ['en', 'cz'];
	$scope.language = {
		//get from localStorage
		lang :'en',
	};


	$scope.changeLang = function()
	{
		//save to localStorage

		$translate.use($scope.language.lang);
	}

}])