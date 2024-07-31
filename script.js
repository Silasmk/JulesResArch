function upload() {
    document.getElementById("input_link").innerHTML = "Changed";
}
var player;

        function onYouTubeIframeAPIReady() {
            player = new YT.Player('youtube-video', {
                events: {
                    'onReady': onPlayerReady
                },
                playerVars: {
                    'start': YOUR_START_TIME,
                    'autoplay': 1,
                    'controls': 0
                }
            });
        }

        function onPlayerReady(event) {
            event.target.seekTo(1189, true);
            event.target.pauseVideo();
        }

        // Load the IFrame Player API code asynchronously.
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);