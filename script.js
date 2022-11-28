var videoElement = document.getElementById('video');
var canvasElement = document.getElementById('canvas');
var canvasCtx = canvasElement.getContext('2d');
points = [];

// class hand
class Hand {
  constructor() {
    this.landmarks = []
  }
  update(landmarks) {
    this.landmarks = landmarks
  }
  
}




var hand  = new Hand();
var state = new HandStateHandler();
// tracking height
var savedHeight = NaN;
var pointColor;

canvasElement.width = window.innerWidth;
canvasElement.height = window.innerHeight;
function onResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
      results.image, 0, 0, canvasElement.width, canvasElement.height);
  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {   

      hand.update(landmarks);
      state.update(hand);
      cords = state.getPostion();
      if (cords!=undefined && cords.position.length > 0){
        mousePosition = {x:cords.position[0], y:cords.position[1]};
        Interact(mousePosition, ACTION_TYPES.SELECT);
      }




      // console.log(landmarks);
      // if (distance(landmarks[0],landmarks[12])<0.2){
      //   // save point where the palm is
      //   points.push(landmarks[9]);
      //   // change color based on height
      //   console.log("palm");    
      // }
      // // if first finger and middle finger are close
      // if (distance(landmarks[4],landmarks[8])<0.1){
      //   currentHeight = landmarks[9];
      //   // change color based on height
      //   console.log("first and middle finger");
      //   if (!savedHeight){
      //     console.log("saved height");
      //     savedHeight = currentHeight;
      //     points.push(savedHeight);
      //   } else
      //   {
      //     // set the color based on the height
      //     pointColor ='hsl('+ 360*distance(currentHeight, savedHeight) +',100%,50%)';
      //     // points.push(savedHeight);
      //   }
      // } else {
      //   console.log("no fingers");
      //   savedHeight = NaN;
      // }    
      // drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
      //                {color: '#00FF00', lineWidth: 5});
      // drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
    }
  }
  drawPoints(canvasCtx, points);
  canvasCtx.restore();
}

// draw points
function drawPoints(ctx, points, options) {    
  // console.log(points);
  for(point in points){
    ctx.beginPath();
    // in the middle of the canvas
    ctx.arc(points[point].x*canvasElement.width, points[point].y*canvasElement.height, 10, 0, 2 * Math.PI);    
    ctx.fillStyle = pointColor;
    ctx.fill();
  }
  ctx.save();
}



function init_hand_detection(params) {
  const hands = new Hands({locateFile: (file) => {
    console.log(`file: ${file}`);
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  }});
  hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  });
  hands.onResults(onResults);
  const camera = new Camera(videoElement, {
    onFrame: async () => {
      await hands.send({image: videoElement});
    },
  width: window.innerWidth,
  height: window.innerHeight
  });
  camera.start();
}



// main function
async function app() {
  await init_hand_detection();
}

app();  


// load options navigator
optionsNavigator = new OptionsNavigator(options, addToSentence)
// create buttons
CreateButtons(optionsNavigator);

// get mouse position
document.addEventListener("click", function(event){
    mousePosition = {x:event.clientX, y:event.clientY};
});
