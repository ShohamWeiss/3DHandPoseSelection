
class HandStateHandler {
    constructor(hand) {
      this.lastState = Gesture.UnSelected;
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
      if (this.checkforStateChange() && this.currentState != Gesture.UnSelected) {
        this.lastState = this.currentState;
        obj.label = "Selected";
        obj.position = this.getCurrentLocation();
        return obj;
      }
      else if (this.checkforStateChange() && this.currentState != Gesture.Selected) {
        this.lastState = this.currentState;
        obj.label = "UnSelected";
        obj.position = [];
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
      var selectingLocation = this.hand.landmarks[FingerTips.MIDDLE_FINGER_MCP];
      return [canvasElement.width - (selectingLocation.x * canvasElement.width), (selectingLocation.y * canvasElement.height)];
    }
      
    checkIsSelected() {
      return this.distance(this.hand.landmarks[FingerTips.MIDDLE_FINGER_TIP],this.hand.landmarks[FingerTips.WRIST] )/this.hand.landmarks[FingerTips.WRIST].z < 0.2
    }
    
    checkforStateChange() {
      return this.currentState != this.lastState;
    }
  
    getCurrentState(){
      if (this.checkIsSelected()) {
        return Gesture.Selected;
      }
      else {
        return Gesture.UnSelected;
      }
    }    
    
    
  }