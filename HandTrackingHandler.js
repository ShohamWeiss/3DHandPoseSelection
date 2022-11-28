// // get canvas
// const canvasElement = document.getElementById('canvas');
// // get the canvas context
// var canvasCtx = canvasElement.getContext('2d');
// // set canvas height and width the screen height and width
// canvasElement.width = window.innerWidth;
// canvasElement.height = window.innerHeight;

// // Get video element
// var videoElement = document.getElementById('video');

// // points to draw
// points = [];

// // tracking height
// var savedHeight = NaN;
// var pointColor;

// function onResults(results) {
//   canvasCtx.save();
//   canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
//   canvasCtx.drawImage(
//       results.image, 0, 0, canvasElement.width, canvasElement.height);
//   if (results.multiHandLandmarks) {
//     for (const landmarks of results.multiHandLandmarks) {      
//       // console.log(landmarks);
//       if (distance(landmarks[0],landmarks[12])<0.2){
//         // save point where the palm is
//         points.push(landmarks[9]);
//         // change color based on height
//         console.log("palm");    
//       }
//       // if first finger and middle finger are close
//       if (distance(landmarks[4],landmarks[8])<0.1){
//         currentHeight = landmarks[9];
//         // change color based on height
//         console.log("first and middle finger");
//         if (!savedHeight){
//           console.log("saved height");
//           savedHeight = currentHeight;
//           points.push(savedHeight);
//         } else
//         {
//           // set the color based on the height
//           pointColor ='hsl('+ 360*distance(currentHeight, savedHeight) +',100%,50%)';
//           // points.push(savedHeight);
//         }
//       } else {
//         console.log("no fingers");
//         savedHeight = NaN;
//       }    
//       // drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
//       //                {color: '#00FF00', lineWidth: 5});
//       // drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
//     }
//   }
//   drawPoints(canvasCtx, points);
//   canvasCtx.restore();
// }

// // draw points
// function drawPoints(ctx, points, options) {    
//   // console.log(points);
//   for(point in points){
//     ctx.beginPath();
//     // in the middle of the canvas
//     ctx.arc(points[point].x*canvasElement.width, points[point].y*canvasElement.height, 10, 0, 2 * Math.PI);    
//     ctx.fillStyle = pointColor;
//     ctx.fill();
//   }
//   ctx.save();
// }

// // distance between two points in 3D space
// function distance(p1, p2) {
//   return Math.hypot(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
// }


// const hands = new Hands({locateFile: (file) => {
//   console.log(`file: ${file}`);
//   return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
// }});
// hands.setOptions({
//   maxNumHands: 2,
//   modelComplexity: 1,
//   minDetectionConfidence: 0.5,
//   minTrackingConfidence: 0.5
// });
// hands.onResults(onResults);

// const camera = new Camera(videoElement, {
//   onFrame: async () => {
//     await hands.send({image: videoElement});
//   },
//   // set to the width and height of the screen
//   width: window.innerWidth,
//   height: window.innerHeight
// });
// camera.start();