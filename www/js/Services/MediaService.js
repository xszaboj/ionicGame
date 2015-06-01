angular.module('starter.services')
.factory('MediaService', function ($cordovaMedia) {

    var source = null;

    function getSource() {
        if (ionic.Platform.isAndroid()) {
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
        console.log("success");
        this.release();
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
            if (ionic.Platform.isAndroid()) {
                console.log('played from media');
                var mediaRes = new Media(srcToPlay, success, error);
                $cordovaMedia.play(mediaRes);
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
