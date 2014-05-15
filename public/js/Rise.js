function Rise() {
  //=========== in-class variables ===========
  this.servoMax = 180;
  this.riseIDs = [];
  this.clocks = [];
  this.clockSpeeds = [];
}

Rise.prototype = {

  //=========== riseIt() ===========  
  riseIt : function() {

    for (var i = 0; i < modules.length; i++) {
      if (this.riseIDs.indexOf(modules[i].id) >= 0) {
        modules[i].servoAngle = this.servoMax; // 0 ~ servoMax
      }
    }
  },

  //=========== addList() ===========
  addList : function(_id) {
    this.riseIDs.push(_id);
    this.clocks.push(0.0);
    this.clockSpeeds.push(0.1);
  },

  //=========== removeList() ===========
  removeList : function(_id) { 
    if (this.riseIDs.length > 0) {
      if (this.riseIDs.indexOf(_id) >= 0) {
        var removeIndex = this.riseIDs.indexOf(_id);
        this.riseIDs.splice(removeIndex, 1);
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
