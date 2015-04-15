angular.module('starter.services')
.factory('MediaService', function () {

    var source = null;
    var device = ionic.Platform.device();

    function getSource() {
        if (typeof device != undefined && device.platform != undefined && device.platform == 'Android') {
            source = '/android_asset/www/' + source;
            return source;
        }
        else {
            return source;
        }
    }

    function setSource(src) {
        source = src;
    }

    function success() {
        // release the media resource once finished playing
        mediaRes.release();
    }

    function error(e) {
        console.log("error playing sound: " + JSON.stringify(e));
    }

    return {
        PlayMedia: function (src) {
            //set source
            setSource(src);
            //get source
            var srcToPlay = getSource();

            //play media object
            if (typeof device != undefined && device.platform != undefined) {
                var mediaRes = new Media(srcToPlay, success, error);
                mediaRes.play();
            }
            else if (typeof Audio != "undefined") {
                console.log("played from audio")
                new Audio(srcToPlay).play();
            }
            else {
                console.log("unable to play sound!");
            }
        }
    }

});
