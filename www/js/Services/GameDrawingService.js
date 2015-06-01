angular.module('starter.services')
.factory('GameDrawingService', function ($ionicModal) {

	return{
		GetWidth : function(){
			return innerWidth;
		},

		GetHeight : function(){
			return innerHeight;
		},
		OpenWindow : function(window){
			window.show();
		},
		CloseWindow : function(window){
			window.hide();
		},

		InitializeModalWindow : function(myscope){
			$ionicModal.fromTemplateUrl('templates/draw.html', {
		        scope: myscope,
		        animation: 'slide-in-up'
		    }).then(function (modal) {
		        myscope.modal = modal;
		    });
		},

		Init: function (scope) {
	        if (!scope.exist) {
	            scope.exist = true;
	            scope.simpleboard = new DrawingBoard.Board('simple-board', {
	               	controls: [{ Navigation: { back: false, forward: false } }],
	               	controlsPosition: "top",
	               	webStorage: false
	            });
	        }
    	},

    	DestroyWindowEvent: function(myscope)
    	{
    		myscope.$on('$destroy', function () {
		        myscope.modal.remove();
		    });
    	},

    	IsGameTypeDrawing : function(myscope)
    	{
    		if (myscope.buttonsDisabled == false && myscope.type == 'D') {
            	return true;
        	} else
            	return false;
    	}
	}
	
})