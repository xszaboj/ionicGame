angular.module('starter.controllers')
.controller('OptionController', ['$scope', '$translate','OptionService', function ($scope, $translate, OptionService) {

	$scope.languages = ['en', 'cz'];
	$scope.language = {
		lang : OptionService.GetLanguage(),
	};


	$scope.changeLang = function()
	{
		var lang = $scope.language.lang;
		OptionService.SaveLanguageState(lang);
		$translate.use(lang);
	}

}])