function Blink() {
  //=========== in-class variables ===========
  this.servoMax = 180;
  this.blinkIDs = [];
  this.clocks = [];
  this.clockSpeeds = [];
}

Blink.prototype = {

  //=========== blinkIt() ===========  
  blinkIt : function() {

    for (var i = 0; i < modules.length; i++) {

      if (this.blinkIDs.indexOf(modules[i].id) >= 0) {
        var blinkIndex = this.blinkIDs.indexOf(modules[i].id);
        var theta = radians(this.clocks[blinkIndex] % 360);
        modules[i].servoAngle = (1 +sin(theta - PI))*this.servoMax/2; // 0 ~ servoMax
      }
    }
  },

  //=========== addList() ===========
  addList : function(_id) {
    this.blinkIDs.push(_id);
    this.clocks.push(0.0);
    this.clockSpeeds.push(0.1);
  },

  //=========== removeList() ===========
  removeList : function(_id) { 
    if (this.blinkIDs.length > 0) {
      if (this.blinkIDs.indexOf(_id) >= 0) {
        var removeIndex = this.blinkIDs.indexOf(_id);
        this.blinkIDs.splice(removeIndex, 1);
        this.clocks.splice(removeIndex, 1);
        this.clockSpeeds.splice(removeIndex, 1);

        for (var i = 0; i < modules.length; i++) {
          if (modules[i].id == _id) {
            modules[i].servoAngle = 0;
          }
        }
      }
    }
  },

  //=========== updateClock() ===========  
  updateClock : function() {
    for (var i = 0; i < this.clocks.length; i++){
      this.clocks[i] += this.clockSpeeds[i];
    }
  }
}
