var players = [];

function createVideoContainers(videos) {
    var containerWrapper = document.getElementById('video-container-wrapper');

    if (!containerWrapper) {
        return;
    }

    containerWrapper.innerHTML = '';

    videos.forEach((video, index) => {
        var div = document.createElement("div");
        div.className = "video-container";
        div.id = `player${index + 1}`;
        containerWrapper.appendChild(div);
    });
}

function loadYouTubeAPI() {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function initializeYouTubePlayers(videos) {
    videos.forEach((video, index) => {
        players[index] = new YT.Player(`player${index + 1}`, {
            height: '180',
            width: '320',
            videoId: video.id,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    });
}

function onYouTubeIframeAPIReady() {
    fetch('path/to/videos.json')
        .then(response => response.json())
        .then(videos => {
            createVideoContainers(videos);
            initializeYouTubePlayers(videos);
        });
}

function onPlayerReady(event) {
    var player = event.target;
    var playerIndex = players.indexOf(player);
    var videoData = videos[playerIndex];

    // Seek to the start time
    player.seekTo(videoData.startTime, true);
    // Mute the video
    player.mute();
    // Start playing the video
    player.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        // Pause the video immediately
        event.target.pauseVideo();
    }
}

// Initialize video containers and load the YouTube API
window.onload = function() {
    loadYouTubeAPI();
};
