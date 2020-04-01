navigator.getUserMedia = navigator.getUserMedia || 
        navigator.webkitGetUserMedia ||
        navigator.mozGetuserMedia ||
        navigator.msGetUserMedia;

const video = document.querySelector('#video');
const audio = document.querySelector('#audio');
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('wd');

let model;
var seconds = 0;

var x = document.getElementById("seconds");



handTrack.startVideo(video)
    .then(status => {
        if(status){
            navigator.getUserMedia({
                video:{}}, stream => {
                    video.srcObject = stream;
                    setInterval(runDetection,1000)
                },
                err => console.log(err)
            );
        }
    });

function runDetection(){
    model.detect(video)
        .then(predictions => {
            if(predictions.length > 0){
                audio.play();
                seconds += 1;
                if(seconds > 0){
                    x.style.display = "block";
                    x.innerHTML = `Seconds: ${seconds}`;
                }
            }
            if(predictions.length == 0){
                audio.pause();
            }
        })
}

const modelParams = {
    flipHorizontal: true,   // flip e.g for video 
    imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.70,    // confidence threshold for predictions.
  }

handTrack.load(modelParams).then(lmodel => {
    model = lmodel;
});





