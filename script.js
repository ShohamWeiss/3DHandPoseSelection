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

class HandStateHandler {
  constructor(hand) {
    this.lastState = this.Gesture.UnSelected;
  }

  update(hand) {
    this.hand = hand;
  }

  getPostion( ) {
    var obj = {
      label: "",
      position: ""
    };
    this.currentState = this.getCurrentState();
    if (this.checkforStateChange() && this.currentState != this.Gesture.UnSelected) {
      this.lastState = this.currentState;
      obj.label = "Selected";
      obj.position = this.getCurrentLocation();
      return obj;
    }
    else if (this.checkforStateChange() && this.currentState != this.Gesture.Selected) {
      this.lastState = this.currentState;
      obj.label = "UnSelected";
      obj.position = this.getCurrentLocation();
      return obj;
    }
    else {
      return;
    }
    
  }

  // distance between two points in 3D space
  distance(p1, p2) {
    return Math.hypot(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
  }

  getCurrentLocation() {
    return this.hand.landmarks[this.FingerTips.MIDDLE_FINGER_MCP];
  }
    
  checkIsSelected() {
    return this.distance(this.hand.landmarks[this.FingerTips.MIDDLE_FINGER_TIP],this.hand.landmarks[this.FingerTips.WRIST] )/this.hand.landmarks[this.FingerTips.WRIST].z < 0.2
  }
  
  checkforStateChange() {
    return this.currentState != this.lastState;
  }

  getCurrentState(){
    if (this.checkIsSelected()) {
      return this.Gesture.Selected;
    }
    else {
      return this.Gesture.UnSelected;
    }
  }



  
  FingerTips = {
    WRIST:0,
    THUMB_CMC:1,
    THUMB_MCP:2,
    THUMB_IP:3,
    THUMB_TIP:4,
    INDEX_FINGER_MCP:5,
    INDEX_FINGER_PIP:6,
    INDEX_FINGER_DIP:7,
    INDEX_FINGER_TIP:8,
    MIDDLE_FINGER_MCP:9,
    MIDDLE_FINGER_PIP:10,
    MIDDLE_FINGER_DIP:11,
    MIDDLE_FINGER_TIP:12,
    RING_FINGER_MCP:13,
    RING_FINGER_PIP:14,
    RING_FINGER_DIP:15,
    RING_FINGER_TIP:16,
    PINKY_MCP:17,
    PINKY_PIP:18,
    PINKY_DIP:19,
    PINKY_TIP:20,
  }
    Gesture = {
    Selected:0,
    UnSelected:1,
  }
  
}

var hand  = new Hand();
var state = new HandStateHandler();
// tracking height
var savedHeight = NaN;
var pointColor;

function onResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
      results.image, 0, 0, canvasElement.width, canvasElement.height);
  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {   

      hand.update(landmarks);
      state.update(hand);
      console.log(state.getPostion());





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
      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                     {color: '#00FF00', lineWidth: 5});
      drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
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
    width: 1280,
    height: 720
  });
  camera.start();
}



// main function
async function app() {
  await init_hand_detection();
}

app();  

