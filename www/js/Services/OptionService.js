angular.module('starter.services')
.factory('OptionService', function () {

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
		}
	}
})