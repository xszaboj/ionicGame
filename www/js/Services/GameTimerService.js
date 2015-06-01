angular.module('starter.services')
.factory('GameTimerService', function (UtilService) {
	var interval = 1000;


	function doThisEverySecond(myscope, StopTimer)
	{
		if (myscope.rangeValue == 60 || myscope.rangeValue > 5) {
            try {
                MediaService.PlayMedia("sound.mp3");
            }
            catch (e) {
                console.log(e);
            }
            finally {
                StopTimer();
            }
        } 
        else {
            myscope.rangeValue++;
        }
	}

	function stopTimer(){
		UtilService.StopTimer();
	}

	return{
		StartTimer : function(myscope){
	        UtilService.StartTimer( function() { doThisEverySecond(myscope, stopTimer); } , interval);
		},

		StopTimer : function()
		{
        	stopTimer();
		},
	}
})