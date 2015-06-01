angular.module('starter.services')
.factory('OptionService', function (WordsService, $translate) {

	var defaultLanguage = 'en';

	return {
		GetLanguage : function(){
			var language = localStorage.getItem("lang");
			if(language != null)
			{
				return language;
			}
			else
				return defaultLanguage;
		},
		SaveLanguageState : function(lang){
			localStorage.setItem('lang', lang);
			WordsService.RefreshAllWords();
			$translate.use(lang);
		},

		InitializeLanguage : function()
		{
			var language = localStorage.getItem("lang");
			if(language == null)
			{
				SaveLanguageState(defaultLanguage);
			}
		}
	}
})