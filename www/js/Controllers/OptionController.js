angular.module('starter.controllers')
.controller('OptionController', ['$scope', 'OptionService', function ($scope, OptionService) {

	$scope.languages = ['en', 'cz'];
	$scope.language = {
		lang : OptionService.GetLanguage(),
	};


	$scope.changeLang = function()
	{
		var lang = $scope.language.lang;
		OptionService.SaveLanguageState(lang);
	}

}])