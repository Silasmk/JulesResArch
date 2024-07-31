/*var videos = [
    { id: 'n3RprPpVp-g', startTime: 1189 },
    { id: 'M7lc1UVf-VE', startTime: 60 },
    { id: '39QXz1bbWxw', startTime: 48 },
    { id: 'bdBwTGJrD6c', startTime: 1670 },
    { id: 'pcuv0RubURo', startTime: 600 },
    { id: 'imq2XbWZwRc', startTime: 60 },
    { id: 'FTIdLXifKO0', startTime: 10 }
];*/
//data = '[{"name" : "Ashwin", "age" : "20"},{"name" : "Abhinandan", "age" : "20"}]';
//var mydata = JSON.parse(data);

fetch("C:\Users\silic\Desktop\ResJu\GitHub\JulesResArch\data.txt")
  .then((res) => res.text())
  .then((text) => {
    const videos = JSON.parse(text);
    alert(videos[0].id)
   })
  .catch((e) => console.error(e));

//alert(mydata[0].name)

var players = [];

function createVideoContainers() {
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

function initializeYouTubePlayers() {
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
    initializeYouTubePlayers();
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

// This function is called when any player's state changes
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        // Pause the video immediately
        event.target.pauseVideo();
    }
}

// Initialize video containers and load the YouTube API
window.onload = function() {
    createVideoContainers();
    loadYouTubeAPI();
};